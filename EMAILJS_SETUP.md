# 📧 CONFIGURAÇÃO DO FORMULÁRIO DE CONTATO (EmailJS)

## ❌ PROBLEMA IDENTIFICADO

O formulário atual usa `mailto:` que:
- ❌ Abre o cliente de email do usuário (Outlook, Gmail local)
- ❌ Requer que o usuário clique "enviar" manualmente
- ❌ Não funciona se o usuário não tiver email configurado
- ❌ Aparência não-profissional

## ✅ SOLUÇÃO IMPLEMENTADA: EmailJS

### 🎯 O que é EmailJS?
Serviço que envia emails diretamente do frontend sem precisar de backend.

### ✅ VANTAGENS:
- ✅ Envio automático direto para seu email
- ✅ Não depende do cliente de email do usuário
- ✅ **Grátis até 200 emails/mês**
- ✅ Fácil configuração (5 minutos)
- ✅ Templates personalizáveis

---

## 🔧 CONFIGURAÇÃO (VOCÊ PRECISA FAZER ISSO)

### **PASSO 1: Criar conta no EmailJS**

1. Acesse: https://www.emailjs.com/
2. Clique em **"Sign Up"** (canto superior direito)
3. Crie conta com email ou Google

---

### **PASSO 2: Adicionar Serviço de Email**

1. Após login, vá em **"Email Services"** (menu lateral)
2. Clique em **"Add New Service"**
3. Escolha **"Gmail"** (recomendado) ou outro
4. **IMPORTANTE:** Se escolher Gmail:
   - Clique em "Connect Account"
   - Faça login com **arielaio@hotmail.com** (ou outra conta)
   - Autorize o EmailJS
5. Anote o **SERVICE ID** (algo como `service_xxxxxxx`)

---

### **PASSO 3: Criar Template de Email**

1. Vá em **"Email Templates"** (menu lateral)
2. Clique em **"Create New Template"**
3. Configure o template:

**Subject (Assunto):**
```
Novo contato via Portfólio - {{from_name}}
```

**Content (Corpo do Email):**
```
Você recebeu uma nova mensagem através do seu portfólio!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mensagem:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Enviado via: https://arielaio.com
Data: {{reply_to}}
```

4. Em **"To Email"** coloque: `arielaio@hotmail.com`
5. Clique em **"Save"**
6. Anote o **TEMPLATE ID** (algo como `template_xxxxxxx`)

---

### **PASSO 4: Pegar sua Public Key**

1. Vá em **"Account"** (menu lateral)
2. Copie a **"Public Key"** (algo como `xxxxxxxxxxxxxxxxxx`)

---

### **PASSO 5: Configurar no seu projeto**

Crie um arquivo `.env.local` na raiz do projeto:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANTE:** Substitua pelos seus IDs reais!

---

## 🚀 COMO TESTAR

1. Configure as variáveis no `.env.local`
2. Reinicie o servidor: `npm run dev`
3. Acesse o formulário
4. Preencha e envie
5. Verifique seu email: **arielaio@hotmail.com**

---

## 🎯 RESULTADO ESPERADO

### **ANTES (❌ Não funciona direito):**
```
Usuário preenche → Clica enviar → Abre Outlook/Gmail → 
Usuário precisa enviar manualmente
```

### **DEPOIS (✅ Profissional):**
```
Usuário preenche → Clica enviar → Email enviado automaticamente → 
Mensagem de sucesso → Você recebe no arielaio@hotmail.com
```

---

## 📊 LIMITE GRATUITO

- ✅ **200 emails/mês** grátis
- ✅ Suficiente para portfólio pessoal
- ✅ Se passar, upgrade por $15/mês (2.000 emails)

---

## 🔒 SEGURANÇA

- ✅ Public Key pode ser exposta (frontend)
- ✅ EmailJS tem proteção anti-spam
- ✅ Você pode adicionar reCAPTCHA depois (opcional)

---

## 🛠️ TROUBLESHOOTING

### **Problema: "Email not sent"**
- Verifique se os IDs estão corretos no `.env.local`
- Confirme que o Service está conectado (Gmail autorizado)
- Veja o console do navegador para erros

### **Problema: Email não chega**
- Verifique spam/lixo eletrônico
- Confirme que o "To Email" no template está correto
- Aguarde até 2 minutos (às vezes demora)

### **Problema: "Failed to load resource"**
- Reinicie o servidor (`npm run dev`)
- Limpe o cache do navegador

---

## 📝 CHECKLIST FINAL

- [ ] 1. Criar conta no EmailJS
- [ ] 2. Adicionar serviço de email (Gmail)
- [ ] 3. Criar template de email
- [ ] 4. Copiar Service ID
- [ ] 5. Copiar Template ID
- [ ] 6. Copiar Public Key
- [ ] 7. Criar `.env.local` com as variáveis
- [ ] 8. Reiniciar servidor
- [ ] 9. Testar formulário
- [ ] 10. Verificar email recebido

---

## 🎉 PRONTO!

Agora seu formulário funciona **profissionalmente** e você recebe os contatos diretamente no **arielaio@hotmail.com**! 🚀
