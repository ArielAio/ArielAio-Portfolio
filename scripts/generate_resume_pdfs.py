#!/usr/bin/env python3
"""Generate Portuguese and English resume PDFs from resume-content.json."""

from html import escape
from pathlib import Path
from xml.sax.saxutils import quoteattr
import json

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "resume-content.json"
OUTPUTS = {
    "pt": ROOT / "public" / "Curriculo_Ariel_Aio.pdf",
    "en": ROOT / "public" / "Curriculo_Ariel_Aio_EN.pdf",
}
BLUE = colors.HexColor("#4831D4")
TEXT = colors.HexColor("#2F2B38")
MUTED = colors.HexColor("#625D72")
SOFT = colors.HexColor("#817A94")
RULE = colors.HexColor("#D2CCE4")


def make_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "ResumeName", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=23, leading=26, textColor=BLUE, spaceAfter=4,
        ),
        "headline": ParagraphStyle(
            "ResumeHeadline", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=9.1, leading=11, textColor=TEXT, spaceAfter=5,
        ),
        "contact": ParagraphStyle(
            "ResumeContact", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.1, leading=10, textColor=MUTED, spaceAfter=10,
        ),
        "section": ParagraphStyle(
            "ResumeSection", parent=base["Normal"], fontName="Helvetica-Bold",
            fontSize=9.8, leading=11.8, textColor=BLUE, uppercase=True,
            spaceBefore=5, spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "ResumeBody", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.75, leading=10.8, textColor=TEXT, spaceAfter=3,
        ),
        "job": ParagraphStyle(
            "ResumeJob", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.9, leading=10.7, textColor=TEXT,
        ),
        "period": ParagraphStyle(
            "ResumePeriod", parent=base["Normal"], fontName="Helvetica",
            fontSize=8, leading=9.8, textColor=SOFT, alignment=2,
        ),
        "description": ParagraphStyle(
            "ResumeDescription", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.4, leading=10.2, textColor=MUTED, spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "ResumeBullet", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.3, leading=10, textColor=TEXT, leftIndent=9,
            firstLineIndent=-7, bulletIndent=0, spaceAfter=1.5,
        ),
        "compact": ParagraphStyle(
            "ResumeCompact", parent=base["Normal"], fontName="Helvetica",
            fontSize=8.4, leading=10.2, textColor=TEXT,
        ),
    }


def linked_text(url, label, color=BLUE):
    return (
        f"<link href={quoteattr(url)} color={quoteattr(color.hexval())}>"
        f"{escape(label)}</link>"
    )


def section_heading(title, styles):
    return [
        Paragraph(escape(title.upper()), styles["section"]),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceAfter=5),
    ]


def experience_block(item, styles, available_width):
    company = escape(item["company"])
    if item.get("projectLink"):
        company = linked_text(item["projectLink"], item["company"])
    role = escape(item["role"])
    heading = Paragraph(
        f"<b>{company}</b><font color='{MUTED.hexval()}'>  |  {role}</font>",
        styles["job"],
    )
    period = Paragraph(escape(item["period"]), styles["period"])
    header = Table([[heading, period]], colWidths=[available_width - 112, 112])
    header.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    parts = [header, Paragraph(escape(item["description"]), styles["description"])]
    for detail in item.get("details", []):
        parts.append(
            Paragraph(
                f"<font color='{BLUE.hexval()}'>•</font> {escape(detail)}",
                styles["bullet"],
            )
        )
    return KeepTogether(parts)


def build_pdf(language, content, profile, destination):
    page_width, _ = A4
    left = right = 14 * mm
    available_width = page_width - left - right
    styles = make_styles()
    labels = content["labels"]
    story = [
        Paragraph(escape(content["name"].upper()), styles["name"]),
        Paragraph(escape(content["headline"]), styles["headline"]),
    ]

    contact_parts = [
        linked_text(f"mailto:{profile['email']}", profile["email"], MUTED),
        linked_text(f"tel:{profile['phoneUri']}", profile["phone"], MUTED),
        linked_text(profile["portfolioUrl"], "Portfólio" if language == "pt" else "Portfolio", MUTED),
        linked_text(profile["linkedin"], "LinkedIn", MUTED),
        linked_text(profile["github"], "GitHub", MUTED),
    ]
    story.append(Paragraph("  |  ".join(contact_parts), styles["contact"]))

    story.extend(section_heading("Resumo" if language == "pt" else "Profile", styles))
    story.extend([
        Paragraph(escape(content["summary"]), styles["body"]),
        Spacer(1, 5),
    ])

    skill_title = "Competências" if language == "pt" else "Core technologies"
    story.extend(section_heading(skill_title, styles))
    story.append(Paragraph(
        "<b>" + escape(labels["coreSkills"]) + ":</b> "
        + escape(", ".join(content["skills"]["core"])),
        styles["compact"],
    ))
    story.append(Paragraph(
        "<b>" + escape(labels["toolsAndPractices"]) + ":</b> "
        + escape(", ".join(content["skills"]["toolsAndPractices"])),
        styles["compact"],
    ))
    story.append(Spacer(1, 5))

    story.extend(section_heading(labels["experience"], styles))
    for item in content["experiences"]:
        story.append(experience_block(item, styles, available_width))
        story.append(Spacer(1, 5))

    story.extend(section_heading(labels["education"], styles))
    for item in content["education"]:
        institution = escape(item["institution"])
        degree = escape(item["degree"])
        heading = Paragraph(f"<b>{institution}</b>  |  {degree}", styles["job"])
        period = Paragraph(escape(item["period"]), styles["period"])
        row = Table([[heading, period]], colWidths=[available_width - 145, 145])
        row.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(row)
        if item.get("description"):
            story.append(Paragraph(escape(item["description"]), styles["description"]))
        story.append(Spacer(1, 2))

    story.extend(section_heading(labels["languages"], styles))
    story.append(Paragraph(escape(content["languages"]), styles["compact"]))

    document = SimpleDocTemplate(
        str(destination),
        pagesize=A4,
        rightMargin=right,
        leftMargin=left,
        topMargin=11 * mm,
        bottomMargin=12 * mm,
        title=f"{content['name']} - {'Curriculo' if language == 'pt' else 'Resume'}",
        author=content["name"],
        subject="Resume",
    )
    document.build(story)


def main():
    data = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    for language, destination in OUTPUTS.items():
        build_pdf(language, data[language], data["profile"], destination)
        print(f"Generated {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
