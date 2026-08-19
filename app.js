const fields = {
  nameInput: 'previewName', roleInput: 'previewRole', locationInput: 'previewLocation',
  emailInput: 'previewEmail', phoneInput: 'previewPhone', linkInput: 'previewLink', summaryInput: 'previewSummary'
};

Object.entries(fields).forEach(([inputId, previewId]) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  input.addEventListener('input', () => { preview.textContent = input.value || input.placeholder; });
});

document.getElementById('photoInput').addEventListener('change', (event) => {
  const [file] = event.target.files;
  const photo = document.getElementById('previewPhoto');
  if (!file) { photo.hidden = true; photo.removeAttribute('src'); return; }
  const reader = new FileReader();
  reader.addEventListener('load', () => { photo.src = reader.result; photo.hidden = false; });
  reader.readAsDataURL(file);
});

function updateRepeatingPreview() {
  const experiencePreview = document.getElementById('previewExperience');
  experiencePreview.innerHTML = [...document.querySelectorAll('#experienceFields .repeatable-item')].map((item) => `
    <div class="resume-entry"><div class="entry-top"><strong>${item.querySelector('.experience-role').value}</strong><span>${item.querySelector('.experience-date').value}</span></div><p class="accent-text">${item.querySelector('.experience-company').value}</p><p>${item.querySelector('.experience-description').value}</p></div>`).join('');
  const educationPreview = document.getElementById('previewEducation');
  educationPreview.innerHTML = [...document.querySelectorAll('#educationFields .repeatable-item')].map((item) => `
    <div class="resume-entry"><div class="entry-top"><strong>${item.querySelector('.education-degree').value}</strong><span>${item.querySelector('.education-date').value}</span></div><p class="accent-text">${item.querySelector('.education-school').value}</p></div>`).join('');
  const skills = document.getElementById('skillsInput').value.split(',').map((skill) => skill.trim()).filter(Boolean);
  document.getElementById('previewSkills').innerHTML = skills.map((skill) => `<span>${skill}</span>`).join('');
  document.getElementById('previewCustomSections').innerHTML = [...document.querySelectorAll('#customSections .custom-section')].map((item) => `
    <section><h3>${item.querySelector('.custom-title').value || 'Qo\'shimcha bo\'lim'}</h3><p>${item.querySelector('.custom-content').value}</p></section>`).join('');
}

document.addEventListener('input', (event) => {
  if (event.target.closest('.repeatable-item') || event.target.id === 'skillsInput') updateRepeatingPreview();
});

function addExperience() {
  const item = document.createElement('div'); item.className = 'repeatable-item';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label>Kompaniya<input class="experience-company" placeholder="Kompaniya nomi" /></label><label>Lavozim<input class="experience-role" placeholder="Lavozim" /></label><label>Davr<input class="experience-date" placeholder="2022 — 2024" /></label><label class="wide">Tavsif<textarea class="experience-description" rows="3" placeholder="Vazifalaringiz va natijalaringiz"></textarea></label>';
  document.getElementById('experienceFields').append(item);
}
function addEducation() {
  const item = document.createElement('div'); item.className = 'repeatable-item';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label>O\'quv muassasasi<input class="education-school" placeholder="Universitet yoki kurs" /></label><label>Mutaxassislik<input class="education-degree" placeholder="Mutaxassislik" /></label><label>Davr<input class="education-date" placeholder="2018 — 2022" /></label>';
  document.getElementById('educationFields').append(item);
}

function addCustomSection() {
  const item = document.createElement('div'); item.className = 'repeatable-item custom-section';
  item.innerHTML = '<button class="remove-button" type="button" aria-label="O\'chirish">×</button><label class="wide">Section nomi<input class="custom-title" value="Sertifikatlar" /></label><label class="wide">Ma\'lumot<textarea class="custom-content" rows="3" placeholder="Sertifikat, mukofot, loyiha yoki boshqa ma\'lumot"></textarea></label>';
  document.getElementById('customSections').append(item);
  updateRepeatingPreview();
  item.querySelector('.custom-title').focus();
}

document.getElementById('addExperience').addEventListener('click', addExperience);
document.getElementById('addEducation').addEventListener('click', addEducation);
document.getElementById('addSection').addEventListener('click', addCustomSection);
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-button')) { event.target.parentElement.remove(); updateRepeatingPreview(); }
});
document.getElementById('printButton').addEventListener('click', () => window.print());
document.getElementById('wordButton').addEventListener('click', () => {
  const paper = document.getElementById('resumePaper').cloneNode(true);
  paper.querySelectorAll('[hidden]').forEach((element) => element.removeAttribute('hidden'));
  const wordStyles = `<style>@page{size:A4;margin:1.5cm}body{font-family:Arial,sans-serif;color:#17211b}.resume-paper{width:18cm;margin:auto}.resume-header{display:flex;justify-content:space-between;border-bottom:3px solid #17211b;padding-bottom:18px}.resume-header h2{font-family:Georgia,serif;font-size:28px;margin:0 0 6px}.resume-header p,h3,.accent-text{color:#d65a3c}.resume-contact{text-align:right;font-size:10px;line-height:1.6}.resume-body{display:flex;gap:28px;padding-top:20px}.resume-main{flex:1}.resume-side{width:130px;border-left:1px solid #ddd;padding-left:18px}h3{font-size:10px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px}p{font-size:11px;line-height:1.55}.entry-top{display:flex;justify-content:space-between}.entry-top strong{font-size:12px}.entry-top span{font-size:10px}.skill-list span{display:inline-block;border:1px solid #ccc;padding:4px;margin:2px;font-size:9px}.profile-photo{width:60px;height:60px;object-fit:cover;border-radius:50%}.resume-footer{border-top:1px solid #ddd;padding-top:12px;font-size:8px;display:flex;justify-content:space-between}</style>`;
  const name = document.getElementById('previewName').textContent || 'resume';
  const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${name}</title>${wordStyles}</head><body>${paper.outerHTML}</body></html>`;
  const blob = new Blob(['\ufeff', documentHtml], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.doc`;
  link.click();
  URL.revokeObjectURL(link.href);
});
document.querySelectorAll('.swatch').forEach((swatch) => swatch.addEventListener('click', () => {
  document.documentElement.style.setProperty('--accent', swatch.dataset.color);
  document.querySelector('.swatch.active').classList.remove('active'); swatch.classList.add('active');
}));
document.querySelectorAll('.style-choice').forEach((choice) => choice.addEventListener('click', () => {
  const paper = document.getElementById('resumePaper');
  paper.className = `resume-paper style-${choice.dataset.style}`;
  document.querySelector('.style-choice.active').classList.remove('active'); choice.classList.add('active');
}));
document.getElementById('clearButton').addEventListener('click', () => {
  if (!window.confirm('Barcha ma\'lumotlar tozalansinmi?')) return;
  document.querySelectorAll('input, textarea').forEach((field) => { field.value = ''; });
  Object.entries(fields).forEach(([inputId, previewId]) => { document.getElementById(previewId).textContent = ''; });
  updateRepeatingPreview();
});
