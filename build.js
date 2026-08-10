const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { navLinks, contactLinks } = require("./src/data/site");

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, "src/pages");
const OUT_DIR = path.join(ROOT, "docs");
const STATIC_DIRS = ["css", "js", "assets"];

function getBasePath(pageRelPath) {
  const depth = (pageRelPath.match(/\//g) || []).length;
  const result = "../".repeat(depth);
  return result
}

function findPages(dir, base = "") {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results = results.concat(findPages(path.join(dir, entry.name), relPath));
    } else if (entry.name.endsWith(".ejs")) {
      results.push(relPath);
    }
  }
  return results;
}

function buildPage(pageRelPath) {
  const srcFile = path.join(PAGES_DIR, pageRelPath);
  const outRelPath = pageRelPath.replace(/\.ejs$/, ".html");
  const outFile = path.join(OUT_DIR, outRelPath);
  const base = getBasePath(pageRelPath);

  const html = ejs.render(
    fs.readFileSync(srcFile, "utf8"),
    { base, navLinks, contactLinks, currentPage: outRelPath },
    { filename: srcFile }
  );

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log("built", outRelPath);
}

function copyStaticDir(name) {
  const src = path.join(ROOT, name);
  const dest = path.join(OUT_DIR, name);
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

function build() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  STATIC_DIRS.forEach(copyStaticDir);

  const pages = findPages(PAGES_DIR);
  pages.forEach(buildPage);

  console.log(`Built ${pages.length} page(s) into docs/`);
}

build();
