// quebrei a cabeça com isso por um bom tempo mas no final aceitei a derrota e pedi pro claudio consertar a minha bagunça
//como isso só é um efeito visual torço que não tenha nenhum problema

/**
 * warp.js — Star warp / hyperspace effect
 * Classic 3D starfield using perspective projection.
 * Stars start far away (high Z) and fly toward the viewer (Z → 0),
 * projected outward from the canvas center. Trail = previous vs current position.
 */
(function () {
  'use strict';

  const canvas = document.getElementById('warp');
  const ctx    = canvas.getContext('2d');

  const NUM_STARS = 220;
  const SPEED     = 7;       // px per frame the Z shrinks (tune for faster/slower warp)
  const SPREAD    = 1600;    // half-width of the 3D star field

  let W, H, CX, CY;
  let stars = [];
  let animId;
