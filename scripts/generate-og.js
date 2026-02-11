const { createCanvas } = require("@napi-rs/canvas");
const { writeFileSync } = require("fs");
const { join } = require("path");

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
gradient.addColorStop(0, "#003b71");
gradient.addColorStop(1, "#0056a8");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Decorative circles
ctx.globalAlpha = 0.08;
ctx.fillStyle = "#ffffff";
ctx.beginPath();
ctx.arc(100, 100, 300, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(1100, 530, 400, 0, Math.PI * 2);
ctx.fill();
ctx.globalAlpha = 1;

// Yellow accent bar at top
ctx.fillStyle = "#f9a825";
ctx.fillRect(0, 0, WIDTH, 6);

// Yellow accent dot
ctx.beginPath();
ctx.arc(600, 200, 40, 0, Math.PI * 2);
ctx.fillStyle = "#f9a825";
ctx.fill();

// Main title
ctx.fillStyle = "#ffffff";
ctx.font = "bold 56px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Prepárate para el", 600, 290);
ctx.font = "bold 64px sans-serif";
ctx.fillStyle = "#f9a825";
ctx.fillText("ICFES Saber 11°", 600, 365);

// Subtitle
ctx.fillStyle = "rgba(255,255,255,0.8)";
ctx.font = "28px sans-serif";
ctx.fillText(
  "Simulacros, infografías y material 100% oficial y gratuito",
  600,
  440,
);

// Bottom bar
ctx.fillStyle = "#f9a825";
ctx.fillRect(450, 490, 300, 3);

// Footer text
ctx.fillStyle = "rgba(255,255,255,0.5)";
ctx.font = "18px sans-serif";
ctx.fillText("Proyecto educativo independiente", 600, 540);

const buffer = canvas.toBuffer("image/png");
writeFileSync(join(__dirname, "..", "public", "og.png"), buffer);
console.log("og.png generated successfully!");
