const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Ensure uploads folder exists
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Serve uploaded files so user can preview/download
app.use("/uploads", express.static(UPLOAD_DIR));

// Multer disk storage with unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

// Only accept PDFs (server-side)
function fileFilter(req, file, cb) {
  const allowedMime = file.mimetype === "application/pdf";
  const ext = path.extname(file.originalname).toLowerCase() === ".pdf";
  if (allowedMime && ext) cb(null, true);
  else cb(new Error("Only PDF files are allowed."));
}

// Multer config: 1MB limit (1 * 1024 * 1024)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
}).single("resume");

// Helper to render fancy UI with content injection
function renderPage(contentScript = "") {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Job Portal — Resume Upload</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg1:#0f172a; --bg2:#0b1220;
  --accent1:#6EE7B7; --accent2:#60A5FA;
  --danger:#ef4444; --success:#10b981;
  --card-w:720px;
}
html,body{height:100%; margin:0; font-family:'Inter',sans-serif;}
body{
  display:flex; justify-content:center; align-items:center;
  background: linear-gradient(135deg,#0f172a,#0b1220);
  overflow:hidden;
  color:#e6eef8;
}
.blob{
  position:absolute; border-radius:50%; filter:blur(80px); opacity:0.8; mix-blend-mode:screen;
  animation:float 12s ease-in-out infinite;
}
.blob.a{width:600px;height:600px;background:linear-gradient(45deg,var(--accent1),#a78bfa);top:-10%;left:-10%;animation-delay:0s;}
.blob.b{width:500px;height:500px;background:linear-gradient(45deg,var(--accent2),#f472b6);bottom:-15%;right:-5%;animation-delay:3s;}
@keyframes float{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-40px) rotate(6deg)}100%{transform:translateY(0) rotate(0deg)}}

.shell{
  backdrop-filter:blur(12px) saturate(180%); -webkit-backdrop-filter:blur(12px) saturate(180%);
  background: rgba(255,255,255,0.05);
  border-radius:22px; padding:32px;
  width:var(--card-w); display:grid; grid-template-columns:1fr 380px; gap:28px;
  box-shadow:0 16px 60px rgba(0,0,0,0.6);
}

header{grid-column:1/-1; display:flex; align-items:center; gap:16px;}
.logo{width:60px;height:60px;background:linear-gradient(135deg,#60A5FA,#6EE7B7); border-radius:16px; display:flex; justify-content:center; align-items:center; font-weight:700; color:#042038; font-size:22px; box-shadow:0 8px 24px rgba(0,0,0,0.2);}
h1{margin:0;font-size:1.25rem;color:#e6f0ff;}
p.lead{margin:2px 0 0 0;color:#a7bbd6;font-size:0.95rem;}

.left{
  display:flex; flex-direction:column; gap:16px; justify-content:center; align-items:center;
}
.dropzone{
  width:100%; border-radius:14px; padding:36px; border:2px dashed rgba(255,255,255,0.08);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px;
  transition:all 0.25s ease;
  background: rgba(255,255,255,0.02);
}
.dropzone.hover{transform:translateY(-8px); border-color:rgba(96,165,250,0.6); box-shadow:0 12px 36px rgba(96,165,250,0.12);}
.dropzone .muted{color:#9fb0d4; font-size:0.95rem;}
.fileinfo{display:flex; gap:12px; align-items:center;}
.btn{padding:10px 18px; border-radius:12px; border:none; cursor:pointer; font-weight:600; background:linear-gradient(90deg,var(--accent1),var(--accent2)); color:#042038; box-shadow:0 10px 24px rgba(0,0,0,0.35); transition:all 0.25s;}
.btn:hover{transform:translateY(-2px); box-shadow:0 14px 36px rgba(0,0,0,0.45);}

.right{
  display:flex; flex-direction:column; gap:14px; padding:20px;
  background: rgba(255,255,255,0.03); border-radius:14px;
}
.meta{font-size:0.95rem;color:#bfd6f1;}
.msg{padding:12px; border-radius:12px; font-weight:600; text-align:center;}
.msg.error{background: rgba(239,68,68,0.12); color:var(--danger);}
.msg.success{background: rgba(16,185,129,0.08); color:var(--success);}
.progress{height:14px;background:rgba(255,255,255,0.03);border-radius:999px;overflow:hidden;}
.progress>i{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--accent2),var(--accent1));border-radius:999px;}
.previewFrame{height:220px; border-radius:14px; overflow:hidden; background:#071124; display:flex; align-items:center; justify-content:center; color:#7ea7ff; font-size:0.95rem; border:1px solid rgba(255,255,255,0.04);}
.small{font-size:0.85rem;color:#9fb0d4;}
.links{display:flex; gap:8px; justify-content:center; margin-top:6px;}

@media(max-width:900px){
  .shell{grid-template-columns:1fr; width:94%;}
  .right{order:2;}
}
</style>
</head>
<body>
<div class="blob a"></div>
<div class="blob b"></div>
<main class="shell">
  <header>
    <div class="logo">JP</div>
    <div>
      <h1>Job Portal — Resume Upload</h1>
      <p class="lead">Drag & drop your PDF resume here or click below. Max 1MB.</p>
    </div>
  </header>

  <section class="left">
    <form id="fallbackForm" action="/upload" method="POST" enctype="multipart/form-data" style="width:100%">
      <div id="dropzone" class="dropzone" tabindex="0">
        <div class="muted" id="dropText">📄 Drop PDF here or <button type="button" id="pickBtn" class="btn">Choose file</button></div>
        <div class="fileinfo small" id="fileInfo" style="display:none;">
          <div id="fname"></div>
          <div id="fsize" style="opacity:0.8"></div>
        </div>
        <input id="fileInput" name="resume" type="file" accept="application/pdf" style="display:none" />
      </div>
      <noscript style="display:block; margin-top:12px; text-align:center;">
        <div class="small" style="color:#cfe6ff">JavaScript is disabled — fallback: select file then click Upload</div>
        <div style="margin-top:8px"><button class="btn" type="submit">Upload</button></div>
      </noscript>
    </form>
  </section>

  <aside class="right">
    <div class="meta">Status</div>
    <div id="statusMsg" class="msg" style="display:none"></div>

    <div class="meta">Upload Progress</div>
    <div class="progress" aria-hidden="true"><i id="progressBar"></i></div>
    <div class="meta" style="margin-top:6px">Preview</div>
    <div id="preview" class="previewFrame small">No file uploaded yet</div>

    <div class="links" id="actionLinks" style="display:none">
      <a id="viewLink" class="btn" target="_blank" rel="noopener">View</a>
      <a id="downloadLink" class="btn" download>Download</a>
    </div>
  </aside>
</main>

<script>
(function () {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const pickBtn = document.getElementById('pickBtn');
  const fileInfo = document.getElementById('fileInfo');
  const fname = document.getElementById('fname');
  const fsize = document.getElementById('fsize');
  const statusMsg = document.getElementById('statusMsg');
  const progressBar = document.getElementById('progressBar');
  const preview = document.getElementById('preview');
  const actionLinks = document.getElementById('actionLinks');
  const viewLink = document.getElementById('viewLink');
  const downloadLink = document.getElementById('downloadLink');

  const MAX_BYTES = 1 * 1024 * 1024;

  function humanSize(n){ if(n>=1e6) return (n/1e6).toFixed(2)+' MB'; if(n>=1e3) return (n/1e3).toFixed(2)+' KB'; return n+' B'; }
  function setMsg(type,text){statusMsg.style.display='block'; statusMsg.className='msg '+(type==='error'?'error':'success'); statusMsg.textContent=(type==='error'?'❌ ':'✅ ')+text;}
  function clearMsg(){statusMsg.style.display='none'; statusMsg.textContent=''; statusMsg.className='msg';}

  function onSelectFile(file){
    clearMsg(); if(!file)return;
    fname.textContent=file.name; fsize.textContent=humanSize(file.size); fileInfo.style.display='flex';
    if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')){setMsg('error','Only PDF files are accepted'); return;}
    if(file.size>MAX_BYTES){setMsg('error','File is bigger than 1MB'); return;}
    preview.innerHTML='<div style="padding:12px">PDF ready to upload: '+file.name+'</div>';
    ajaxUpload(file);
  }

  function ajaxUpload(file){
    const xhr=new XMLHttpRequest(); const fd=new FormData(); fd.append('resume',file);
    xhr.upload.onprogress=function(e){if(e.lengthComputable){progressBar.style.width=Math.round(e.loaded/e.total*100)+'%';}};
    xhr.onload=function(){
      progressBar.style.width='100%';
      try{const json=JSON.parse(xhr.responseText);
        if(json&&json.success){
          setMsg('success',json.message||'Upload complete');
          const url=json.fileUrl; preview.innerHTML='<iframe src="'+url+'" style="width:100%; height:100%; border:0;"></iframe>';
          viewLink.href=url; downloadLink.href=url; actionLinks.style.display='flex';
        }else{setMsg('error',(json&&json.message)||'Upload failed');}
      }catch(err){setMsg('error','Unexpected server response.');}
    };
    xhr.onerror=function(){setMsg('error','Upload failed due to network/server error.');};
    xhr.open('POST','/upload',true); xhr.setRequestHeader('X-Requested-With','XMLHttpRequest'); xhr.send(fd);
    setMsg('success','Uploading...');
  }

  ['dragenter','dragover'].forEach(ev=>{dropzone.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();dropzone.classList.add('hover');});});
  ['dragleave','drop'].forEach(ev=>{dropzone.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();dropzone.classList.remove('hover');});});
  dropzone.addEventListener('drop',e=>{const f=e.dataTransfer.files&&e.dataTransfer.files[0]; if(f) onSelectFile(f);});
  pickBtn.addEventListener('click',()=>fileInput.click());
  fileInput.addEventListener('change',e=>{const f=e.target.files&&e.target.files[0]; if(f) onSelectFile(f);});
  dropzone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fileInput.click();}});
})();
</script>
</body>
</html>
`;
}

// GET - serve UI
app.get("/", (req, res) => {
  res.send(renderPage());
});

// POST - handle upload (works for both AJAX and normal form submit)
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    // Determine if request is AJAX (fetch/xhr) by header
    const isAjax = req.headers['x-requested-with'] === 'XMLHttpRequest';

    if (err) {
      // Multer errors include size, fileFilter, etc.
      const message = err.message || "Upload failed.";
      if (isAjax) return res.status(400).json({ success: false, message });
      return res.send(renderPage(`<script>document.addEventListener('DOMContentLoaded',()=>{ alert(${JSON.stringify("Error: " + message)}) ; window.location='/' });</script>`));
    }

    if (!req.file) {
      const message = "No file uploaded.";
      if (isAjax) return res.status(400).json({ success: false, message });
      return res.send(renderPage(`<script>document.addEventListener('DOMContentLoaded',()=>{ alert(${JSON.stringify(message)}) ; window.location='/' });</script>`));
    }

    // Success: provide URL to uploaded file
    const fileUrl = "/uploads/" + encodeURIComponent(req.file.filename);
    const message = "Resume uploaded successfully.";

    if (isAjax) {
      return res.json({ success: true, message, fileUrl });
    }

    // Fallback HTML response for non-AJAX (rare, if JS disabled)
    res.send(renderPage(`
      <div style="text-align:center; width:100%">
        <div class="msg success">✅ ${message}</div>
        <div style="margin-top:12px" class="small">Saved as: <strong>${req.file.filename}</strong></div>
        <div style="margin-top:12px">
          <a class="btn" href="${fileUrl}" target="_blank">View</a>
          <a class="btn" href="${fileUrl}" download>Download</a>
        </div>
        <div style="margin-top:10px"><a href="/" class="small">Upload another</a></div>
      </div>
    `));
  });
});

app.listen(port, () => {
  console.log(`✅ Job Portal running at http://localhost:${port}`);
});
