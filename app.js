const fields = {
  nameInput: 'previewName', roleInput: 'previewRole', locationInput: 'previewLocation',
  emailInput: 'previewEmail', phoneInput: 'previewPhone', linkInput: 'previewLink', summaryInput: 'previewSummary'
};

const translations = {
  uz: { clear: 'Tozalash', live: "Jonli ko'rinish", profile: 'Profil', experience: 'Tajriba', education: "Ta'lim", skills: "Ko'nikmalar", languages: 'Tillar', name: 'Ism va familiya', role: 'Lavozim', location: 'Shahar', email: 'Email', phone: 'Telefon', link: 'LinkedIn / Portfolio', summary: "O'zingiz haqingizda", company: 'Kompaniya', period: 'Davr', description: 'Tavsif', school: "O'quv muassasasi", degree: 'Mutaxassislik', add: "+ Qo'shish", extra: "Qo'shimcha bo'limlar", style: 'CV uslubi', skillsHint: 'Vergul bilan ajrating: JavaScript, Figma, Excel', dark: '☾ Dark', light: '☀ Light' },
  ru: { clear: 'Очистить', live: 'Предпросмотр', profile: 'Профиль', experience: 'Опыт', education: 'Образование', skills: 'Навыки', languages: 'Языки', name: 'Имя и фамилия', role: 'Должность', location: 'Город', email: 'Email', phone: 'Телефон', link: 'LinkedIn / Портфолио', summary: 'О себе', company: 'Компания', period: 'Период', description: 'Описание', school: 'Учебное заведение', degree: 'Специальность', add: '+ Добавить', extra: 'Дополнительные разделы', style: 'Стиль CV', skillsHint: 'Разделяйте запятыми: JavaScript, Figma, Excel', dark: '☾ Тёмная', light: '☀ Светлая' },
  en: { clear: 'Clear', live: 'Live preview', profile: 'Profile', experience: 'Experience', education: 'Education', skills: 'Skills', languages: 'Languages', name: 'Full name', role: 'Job title', location: 'Your city', email: 'Email', phone: 'Phone', link: 'LinkedIn / Portfolio', summary: 'About you', company: 'Company', period: 'Period', description: 'Description', school: 'School', degree: 'Degree', add: '+ Add', extra: 'Additional sections', style: 'CV style', skillsHint: 'Separate with commas: JavaScript, Figma, Excel', dark: '☾ Dark', light: '☀ Light' }
};
const placeholders = {
  uz: { nameInput: 'Ism Familiya', roleInput: 'Masalan, Frontend Developer', locationInput: 'Shahar, davlat', emailInput: 'email@example.com', phoneInput: 'Telefon raqam', linkInput: 'havola', summaryInput: 'Qisqacha professional profil', skillsInput: 'Vergul bilan ajrating: JavaScript, Figma, Excel' },
  ru: { nameInput: 'Имя Фамилия', roleInput: 'Например, Frontend Developer', locationInput: 'Город, страна', emailInput: 'email@example.com', phoneInput: 'Номер телефона', linkInput: 'Ссылка', summaryInput: 'Краткий профессиональный профиль', skillsInput: 'Разделяйте запятыми: JavaScript, Figma, Excel' },
  en: { nameInput: 'Full name', roleInput: 'For example, Frontend Developer', locationInput: 'City, country', emailInput: 'email@example.com', phoneInput: 'Phone number', linkInput: 'Link', summaryInput: 'Short professional profile', skillsInput: 'Separate with commas: JavaScript, Figma, Excel' }
};
const uiTranslations = {
  uz: ['Yangi imkoniyatlar uchun', "Rezyumengizni", "o'zingizga moslang.", "Ma'lumotlaringizni kiriting — chiroyli, professional CV tayyor. Istalgan payt PDF yoki Word sifatida yuklab oling.", "Asosiy ma'lumotlar", "O'zingiz haqingizda", 'Tajriba', "Ta'lim", "Ko'nikmalar", "Qo'shimcha bo'limlar", 'CV uslubi', 'Profil rasmi', 'Ixtiyoriy · JPG yoki PNG', 'Accent rangi', '● Avtomatik saqlandi'],
  ru: ['Для новых возможностей', 'Создайте резюме', 'в своем стиле.', 'Введите данные — получите красивое профессиональное CV. Скачайте его в PDF или Word в любое время.', 'Основная информация', 'О себе', 'Опыт', 'Образование', 'Навыки', 'Дополнительные разделы', 'Стиль CV', 'Фото профиля', 'Необязательно · JPG или PNG', 'Цвет акцента', '● Сохранено автоматически'],
  en: ['For new opportunities', 'Build your resume', 'your way.', 'Enter your details and get a polished professional CV. Download it as PDF or Word anytime.', 'Basic information', 'About you', 'Experience', 'Education', 'Skills', 'Additional sections', 'CV style', 'Profile photo', 'Optional · JPG or PNG', 'Accent color', '● Saved automatically']
};

const getText = (id) => document.getElementById(id)?.value.trim() || '';
const getItemText = (item, selector) => item.querySelector(selector)?.value.trim() || '';
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

function updateRepeatingPreview() {
  document.getElementById('previewExperience').innerHTML = [...document.querySelectorAll('#experienceFields .repeatable-item')].map((item) => {
    const role = getItemText(item, '.experience-role'); const date = getItemText(item, '.experience-date'); const company = getItemText(item, '.experience-company'); const description = getItemText(item, '.experience-description');
    if (!role && !date && !company && !description) return '';
    return `<div class="resume-entry"><div class="entry-top"><strong>${escapeHtml(role)}</strong><span>${escapeHtml(date)}</span></div><p class="accent-text">${escapeHtml(company)}</p><p>${escapeHtml(description)}</p></div>`;
  }).join('');
  document.getElementById('previewEducation').innerHTML = [...document.querySelectorAll('#educationFields .repeatable-item')].map((item) => {
    const school = getItemText(item, '.education-school'); const degree = getItemText(item, '.education-degree'); const date = getItemText(item, '.education-date');
    if (!school && !degree && !date) return '';
    return `<div class="resume-entry"><div class="entry-top"><strong>${escapeHtml(degree)}</strong><span>${escapeHtml(date)}</span></div><p class="accent-text">${escapeHtml(school)}</p></div>`;
  }).join('');
  document.getElementById('previewSkills').innerHTML = getText('skillsInput').split(',').map((skill) => skill.trim()).filter(Boolean).map((skill) => `<span>${escapeHtml(skill)}</span>`).join('');
  document.getElementById('previewCustomSections').innerHTML = [...document.querySelectorAll('#customSections .custom-section')].map((item) => `<section><h3>${escapeHtml(getItemText(item, '.custom-title'))}</h3><p>${escapeHtml(getItemText(item, '.custom-content'))}</p></section>`).join('');
}

function updatePreview() {
  Object.entries(fields).forEach(([inputId, previewId]) => { document.getElementById(previewId).textContent = getText(inputId); });
  updateRepeatingPreview();
}

function applyLanguage(language) {
  const copy = translations[language];
  const placeholderCopy = placeholders[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => { if (copy[element.dataset.i18n]) element.childNodes[0].textContent = copy[element.dataset.i18n]; });
  document.querySelectorAll('[data-placeholder]').forEach((element) => { element.placeholder = copy[element.dataset.placeholder] || element.placeholder; });
  const labels = { nameInput: 'name', roleInput: 'role', locationInput: 'location', emailInput: 'email', phoneInput: 'phone', linkInput: 'link', summaryInput: 'summary', skillsInput: 'skillsHint' };
  Object.entries(labels).forEach(([id, key]) => { const input = document.getElementById(id); if (input) { input.placeholder = placeholderCopy[id]; const label = input.closest('label'); if (label && copy[key]) label.childNodes[0].textContent = copy[key]; } });
  const sectionHeadings = { '.resume-main section:nth-child(1) h3': 'profile', '.resume-main section:nth-child(2) h3': 'experience', '.resume-main section:nth-child(3) h3': 'education', '.resume-side section:nth-child(1) h3': 'skills' };
  Object.entries(sectionHeadings).forEach(([selector, key]) => { const element = document.querySelector(selector); if (element) element.textContent = copy[key]; });
  document.querySelectorAll('#experienceFields .repeatable-item label, #educationFields .repeatable-item label').forEach((label) => { const input = label.querySelector('input, textarea'); const key = input?.className.includes('company') ? 'company' : input?.className.includes('experience-role') ? 'role' : input?.className.includes('degree') ? 'degree' : input?.className.includes('date') ? 'period' : input?.className.includes('description') ? 'description' : input?.className.includes('school') ? 'school' : ''; if (key && copy[key]) label.childNodes[0].textContent = copy[key]; });
  document.querySelectorAll('.add-button').forEach((button) => { button.textContent = copy.add; });
  const ui = uiTranslations[language];
  const uiElements = [document.querySelector('.eyebrow'), document.querySelector('.intro-row h1'), document.querySelector('.intro-row h1 em'), document.querySelector('.intro-copy'), ...document.querySelectorAll('.panel-heading h2'), document.querySelector('.photo-upload'), document.querySelector('.file-hint'), document.querySelector('.style-label'), document.querySelector('.saved-note')];
  uiElements.forEach((element, index) => { if (element && ui[index]) element.childNodes[0].textContent = ui[index]; });
  document.getElementById('clearButton').textContent = copy.clear;
  document.getElementById('themeButton').textContent = document.body.classList.contains('dark-mode') ? copy.light : copy.dark;
  localStorage.setItem('resume-language', language);
}

function addExperience() {
  const item = document.createElement('div'); item.className = 'repeatable-item';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label data-i18n="company">Kompaniya<input class="experience-company" data-placeholder="companyName" placeholder="Kompaniya nomi" /></label><label data-i18n="role">Lavozim<input class="experience-role" data-placeholder="role" placeholder="Lavozim" /></label><label data-i18n="period">Davr<input class="experience-date" placeholder="2022 — 2024" /></label><label class="wide" data-i18n="description">Tavsif<textarea class="experience-description" data-placeholder="descriptionHint" rows="3" placeholder="Vazifalaringiz va natijalaringiz"></textarea></label>';
  document.getElementById('experienceFields').append(item); applyLanguage(document.getElementById('languageSelect').value);
}

function addEducation() {
  const item = document.createElement('div'); item.className = 'repeatable-item';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label data-i18n="school">O\'quv muassasasi<input class="education-school" placeholder="Universitet yoki kurs" /></label><label data-i18n="degree">Mutaxassislik<input class="education-degree" placeholder="Mutaxassislik" /></label><label data-i18n="period">Davr<input class="education-date" placeholder="2018 — 2022" /></label>';
  document.getElementById('educationFields').append(item); applyLanguage(document.getElementById('languageSelect').value);
}

function addCustomSection() {
  const item = document.createElement('div'); item.className = 'repeatable-item custom-section';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label class="wide">Section nomi<input class="custom-title" placeholder="Bo\'lim nomi" /></label><label class="wide">Ma\'lumot<textarea class="custom-content" rows="3" placeholder="Qo\'shimcha ma\'lumot"></textarea></label>';
  document.getElementById('customSections').append(item); item.querySelector('.custom-title').focus(); updateRepeatingPreview();
}

async function downloadPdf() {
  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    window.alert('PDF kutubxonalari yuklanmadi. Internetni tekshirib, qayta urinib ko\'ring.');
    return;
  }
  const source = document.getElementById('resumePaper');
  const paper = source.cloneNode(true);
  Object.assign(paper.style, { position: 'fixed', left: '-10000px', top: '0', width: '794px', minWidth: '794px', height: '1123px', minHeight: '1123px', margin: '0', boxShadow: 'none', overflow: 'hidden' });
  document.body.append(paper);
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(paper, { scale: 2, backgroundColor: '#fffdf8', useCORS: true, logging: false });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pageWidth = 210; const pageHeight = 297;
    const imageRatio = canvas.height / canvas.width;
    const imageWidth = Math.min(pageWidth, pageHeight / imageRatio);
    const imageHeight = imageWidth * imageRatio;
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', (pageWidth - imageWidth) / 2, (pageHeight - imageHeight) / 2, imageWidth, imageHeight, undefined, 'FAST');
    const fileName = `${(getText('nameInput') || 'resume').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.pdf`;
    const blob = pdf.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); link.download = fileName; link.rel = 'noopener';
    document.body.append(link);
    if ('download' in link) link.click();
    else window.open(link.href, '_blank', 'noopener');
    setTimeout(() => { URL.revokeObjectURL(link.href); link.remove(); }, 1000);
  } catch (error) {
    console.error('PDF export failed:', error);
    window.alert('PDF yaratib bo\'lmadi. Ma\'lumotlarni tekshirib, qayta urinib ko\'ring.');
  } finally {
    paper.remove();
  }
}

document.querySelectorAll('input, textarea').forEach((input) => input.addEventListener('input', updatePreview));
document.getElementById('addExperience').addEventListener('click', addExperience);
document.getElementById('addEducation').addEventListener('click', addEducation);
document.getElementById('addSection').addEventListener('click', addCustomSection);
document.addEventListener('click', (event) => { if (event.target.classList.contains('remove-button')) { event.target.parentElement.remove(); updatePreview(); } });
document.getElementById('photoInput').addEventListener('change', (event) => { const [file] = event.target.files; const photo = document.getElementById('previewPhoto'); if (!file) { photo.hidden = true; return; } const reader = new FileReader(); reader.addEventListener('load', () => { photo.src = reader.result; photo.hidden = false; }); reader.readAsDataURL(file); });
document.getElementById('printButton').addEventListener('click', downloadPdf);
document.getElementById('wordButton').addEventListener('click', () => { const paper = document.getElementById('resumePaper').cloneNode(true); const name = getText('nameInput') || 'resume'; const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([`<!doctype html><html><body>${paper.outerHTML}</body></html>`], { type: 'application/msword' })); link.download = `${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.doc`; link.click(); URL.revokeObjectURL(link.href); });
document.querySelectorAll('.swatch').forEach((swatch) => swatch.addEventListener('click', () => { document.documentElement.style.setProperty('--accent', swatch.dataset.color); document.querySelector('.swatch.active')?.classList.remove('active'); swatch.classList.add('active'); }));
document.querySelectorAll('.style-choice').forEach((choice) => choice.addEventListener('click', () => { document.getElementById('resumePaper').className = `resume-paper style-${choice.dataset.style}`; document.querySelector('.style-choice.active')?.classList.remove('active'); choice.classList.add('active'); }));
document.getElementById('themeButton').addEventListener('click', () => { document.body.classList.toggle('dark-mode'); applyLanguage(document.getElementById('languageSelect').value); });
document.getElementById('languageSelect').addEventListener('change', (event) => applyLanguage(event.target.value));
document.getElementById('clearButton').addEventListener('click', () => { if (!window.confirm('Barcha ma\'lumotlar tozalansinmi?')) return; document.querySelectorAll('input, textarea').forEach((field) => { if (field.id !== 'photoInput') field.value = ''; }); document.getElementById('previewPhoto').hidden = true; updatePreview(); });

document.querySelector('.resume-footer').textContent = '';
document.querySelector('.resume-side section:nth-child(2)')?.remove();
document.getElementById('languageSelect').value = localStorage.getItem('resume-language') || 'uz';
applyLanguage(document.getElementById('languageSelect').value);
updatePreview();
