/* ==========================================================================
   Jenny Vera Spa — gráficos de informe sobre Apache ECharts (renderer SVG)
   --------------------------------------------------------------------------
   Requiere antes: <script src="{{SKILL}}/assets/vendor/echarts.min.js"></script>

   Uso en el informe:
     <div class="grafico-js" id="g-clics" style="height:62mm"></div>
     <script>
       JVS.linea("#g-clics", {
         categorias: ["jul", "ago", "sep"],
         series: [{ nombre: "Clics", canal: "gsc", datos: [247, 304, 283], area: true }],
         hitos: [{ x: "ago", texto: "Enlazado interno" }],
       });
     </script>

   Todo se dibuja en SVG (vectorial en el PDF) y SIN animación (Chrome imprime
   el estado final). Se espera a que Inter esté cargada para medir el texto.
   ========================================================================== */
(function () {
  "use strict";

  // — Paleta: idéntica a los tokens de estilos.css (validada para daltonismo) —
  const CANAL = {
    total: "#A88420", // oro — total del negocio / serie única
    meta: "#2F6AA8",  // azul — Meta Ads
    gsc: "#1E8C66",   // verde — Google orgánico
    gbp: "#C65A2E",   // terracota — Ficha de Google
    otros: "#8A5AAE", // violeta — TikTok / otros
  };
  const SERIES = [CANAL.total, CANAL.meta, CANAL.gsc, CANAL.gbp, CANAL.otros];
  const RAMPA_ORO = ["#D4B048", "#B8931F", "#8F7119", "#634E11", "#3A2D08"];
  const C = {
    oro: "#D4AF37", oroTexto: "#7A6422", carbon: "#1B1B1B", crema: "#FDFBF7",
    arena: "#F5F2EB", linea: "#E6DECD", rejilla: "#EFE9DC",
    tinta2: "#4A4A4A", tinta3: "#6B6B6B", positivo: "#1B7F4C", negativo: "#B3402E",
  };
  const FUENTE = 'Inter, "Helvetica Neue", Arial, sans-serif';

  // — Formato español. de-DE agrupa también los números de 4 cifras (1.284),
  //   es-ES no lo hace (1284), por eso se usa de-DE —
  const fmt = (v, dec = 0) =>
    v == null || Number.isNaN(v) ? "—"
      : Number(v).toLocaleString("de-DE", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const FORMATOS = {
    numero: (v) => fmt(v),
    dolar: (v) => "$" + fmt(v, v !== 0 && Math.abs(v) < 10 ? 2 : 0),
    dolar2: (v) => "$" + fmt(v, 2),
    pct: (v) => fmt(v, v !== 0 && Math.abs(v) < 10 ? 1 : 0) + " %",
  };
  const formateador = (f) => (typeof f === "function" ? f : FORMATOS[f || "numero"]);
  const color = (s, i) => s.color || CANAL[s.canal] || SERIES[i % SERIES.length];

  // — Tema base —
  const ejeCategoria = {
    type: "category",
    axisLine: { lineStyle: { color: C.linea } },
    axisTick: { show: false },
    axisLabel: { color: C.tinta3, fontSize: 10, fontFamily: FUENTE, margin: 9 },
  };
  const ejeValor = (f) => ({
    type: "value",
    splitNumber: 4,
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: C.rejilla, type: [3, 3] } },
    axisLabel: { color: C.tinta3, fontSize: 10, fontFamily: FUENTE, formatter: formateador(f) },
  });
  const leyenda = (series) => ({
    show: series.length > 1,
    top: 0,
    left: 0,
    icon: "roundRect",
    itemWidth: 10,
    itemHeight: 4,
    itemGap: 16,
    textStyle: { color: C.tinta2, fontSize: 10, fontFamily: FUENTE },
  });
  const base = (series) => ({
    animation: false,
    textStyle: { fontFamily: FUENTE },
    color: SERIES,
    legend: leyenda(series),
  });

  // Degradado vertical para áreas
  const degradado = (hex, alfa = 0.22) => ({
    type: "linear", x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: hex + Math.round(alfa * 255).toString(16).padStart(2, "0") },
      { offset: 1, color: hex + "00" },
    ],
  });

  // Espera a la fuente y dibuja
  const fuentesListas = (document.fonts
    ? Promise.all([document.fonts.load('400 10px "Inter"'), document.fonts.load('600 10px "Inter"')])
    : Promise.resolve()).catch(() => {});
  let pendientes = 0;
  function dibujar(sel, opcion) {
    pendientes++;
    document.documentElement.dataset.graficos = "pendiente";
    fuentesListas.then(() => {
      const el = typeof sel === "string" ? document.querySelector(sel) : sel;
      if (!el) { console.error("JVS: no existe", sel); return; }
      const chart = echarts.init(el, null, { renderer: "svg" });
      chart.setOption(opcion);
      if (--pendientes === 0) document.documentElement.dataset.graficos = "listo";
    });
  }

  // ======================================================================
  // LÍNEA / ÁREA — evolución temporal. Hasta 5 series.
  //   series[i]: { nombre, datos, canal|color, area?, punteada?, etiquetaFinal? }
  //   hitos: [{ x, texto }]   → línea vertical fina con rótulo
  //   tramos: [{ desde, hasta, texto }] → banda crema de fondo (p. ej. una pausa)
  //   destacar: { x, serie?, texto } → punto resaltado con rótulo (récord)
  // ======================================================================
  function linea(sel, o) {
    const f = formateador(o.formato);
    const varias = o.series.length > 1;
    const series = o.series.map((s, i) => {
      const col = color(s, i);
      const serie = {
        type: "line",
        name: s.nombre,
        data: s.datos,
        smooth: o.suave === false ? false : 0.3,
        symbol: "circle",
        symbolSize: o.puntos === false ? 0 : 5,
        showSymbol: o.puntos !== false,
        connectNulls: false,
        lineStyle: { width: 2, color: col, type: s.punteada ? [4, 3] : "solid", cap: "round" },
        itemStyle: { color: col, borderColor: "#fff", borderWidth: 1.2 },
        areaStyle: s.area || (!varias && o.area !== false) ? { color: degradado(col) } : undefined,
        z: 3,
        endLabel: {
          show: s.etiquetaFinal ?? (varias && o.etiquetasFinales !== false),
          formatter: s.nombre,
          color: C.tinta2, fontSize: 9.5, fontFamily: FUENTE, distance: 6,
        },
        label: o.valores === "ultimo" || s.valores === "ultimo"
          ? { show: true, position: "top", color: C.tinta2, fontSize: 8.5, fontWeight: 600, distance: 6,
              formatter: (p) => (p.dataIndex === s.datos.length - 1 ? f(p.value) : "") }
          : o.valores === "todos" || s.valores === "todos"
          ? { show: true, position: "top", color: C.tinta2, fontSize: 8, distance: 5, formatter: (p) => f(p.value) }
          : undefined,
      };
      if (i === 0 && (o.hitos || o.tramos)) {
        if (o.hitos) serie.markLine = {
          symbol: "none", silent: true,
          lineStyle: { color: C.oro, width: 0.8, type: [2, 2] },
          label: { color: C.oroTexto, fontSize: 8, fontFamily: FUENTE, position: "insideEndTop", formatter: (p) => p.name },
          data: o.hitos.map((h) => ({ xAxis: h.x, name: h.texto })),
        };
        if (o.tramos) serie.markArea = {
          silent: true,
          itemStyle: { color: "rgba(212,175,55,0.10)" },
          label: { color: C.oroTexto, fontSize: 8, fontFamily: FUENTE, position: "insideTop", distance: 4 },
          data: o.tramos.map((t) => [{ xAxis: t.desde, name: t.texto }, { xAxis: t.hasta }]),
        };
      }
      if (o.destacar && (o.destacar.serie ?? 0) === i) {
        const idx = o.destacar.indice ?? (o.destacar.x === "ultimo" ? s.datos.length - 1 : o.categorias.lastIndexOf(o.destacar.x));
        serie.markPoint = {
          symbol: "circle", symbolSize: 9, silent: true,
          itemStyle: { color: col, borderColor: "#fff", borderWidth: 2 },
          label: { show: true, position: "top", distance: 8, color: C.carbon, fontSize: 8.5, fontWeight: 600,
                   fontFamily: FUENTE, formatter: o.destacar.texto },
          // Por índice: las etiquetas pueden repetirse (dos «oct» en una serie de 16 meses)
          data: [{ coord: [idx, s.datos[idx]] }],
        };
      }
      return serie;
    });
    const derecha = varias && o.etiquetasFinales !== false ? (o.margenDerecho ?? 92) : 18;
    dibujar(sel, {
      ...base(o.series),
      grid: { top: (varias ? 30 : 16) + (o.destacar || o.valores ? 14 : 0), right: derecha, bottom: 4,
              left: o.valores || o.series.some((s) => s.valores) ? 16 : 4, containLabel: true },
      // Con rótulos de valor, aire en los extremos para que no se corten
      xAxis: { ...ejeCategoria, data: o.categorias, boundaryGap: !!(o.valores || o.series.some((s) => s.valores)) },
      yAxis: { ...ejeValor(o.formato), min: o.min ?? 0, max: o.max },
      series,
    });
  }

  // ======================================================================
  // BARRAS — magnitud. Verticales por defecto; horizontal: true para rankings.
  //   series[i]: { nombre, datos, canal|color }
  //   apilado: true → barras apiladas (partes de un total)
  //   colores: [..] → un color por barra (una sola serie, p. ej. por canal)
  //   etiquetas: false para no rotular el valor
  // ======================================================================
  function barras(sel, o) {
    const f = formateador(o.formato);
    const h = !!o.horizontal;
    const n = o.series.length;
    const series = o.series.map((s, i) => {
      const col = color(s, i);
      const ultima = !o.apilado || i === n - 1;
      return {
        type: "bar",
        name: s.nombre,
        data: o.colores
          ? s.datos.map((v, k) => ({ value: v, itemStyle: { color: o.colores[k] } }))
          : s.datos,
        stack: o.apilado ? "total" : undefined,
        barMaxWidth: h ? 14 : 26,
        barGap: "18%",
        itemStyle: {
          color: col,
          borderRadius: ultima ? (h ? [0, 3, 3, 0] : [3, 3, 0, 0]) : 0,
          borderColor: o.apilado ? "#fff" : undefined,
          borderWidth: o.apilado ? 1 : 0,
        },
        label: {
          show: o.etiquetas !== false && (o.apilado ? !!o.etiquetasInternas : true),
          position: o.apilado ? "inside" : h ? "right" : "top",
          color: o.apilado ? "#fff" : C.tinta2,
          fontSize: 9.5, fontFamily: FUENTE, distance: 4,
          formatter: (p) => (o.etiquetaTexto ? o.etiquetaTexto(p.value, p.dataIndex, i) : (p.value == null ? "" : f(p.value))),
        },
      };
    });
    const cat = { ...ejeCategoria, data: o.categorias,
      axisLabel: { ...ejeCategoria.axisLabel, width: o.anchoEtiqueta, overflow: o.anchoEtiqueta ? "truncate" : "none" } };
    const val = { ...ejeValor(o.formato), max: o.max };
    if (h) { cat.inverse = true; cat.axisLine = { show: false }; val.splitLine.show = !!o.rejilla; val.axisLabel.show = !!o.rejilla; }
    dibujar(sel, {
      ...base(o.series),
      grid: { top: n > 1 ? 34 : 18, right: h ? 40 : 8, bottom: 4, left: 4, containLabel: true },
      xAxis: h ? val : cat,
      yAxis: h ? cat : val,
      series,
    });
  }

  // ======================================================================
  // DONUT — reparto de un total en ≤ 5 partes. Rótulos fuera con %.
  //   datos: [{ nombre, valor, canal|color }], centro: { valor, texto }
  // ======================================================================
  function donut(sel, o) {
    const total = o.datos.reduce((a, d) => a + d.valor, 0);
    dibujar(sel, {
      animation: false,
      textStyle: { fontFamily: FUENTE },
      title: o.centro ? {
        text: o.centro.valor, subtext: o.centro.texto, left: "center", top: "38%",
        textStyle: { fontFamily: '"Playfair Display", serif', fontSize: 20, fontWeight: 500, color: C.carbon },
        subtextStyle: { fontFamily: FUENTE, fontSize: 8, color: C.tinta3 }, itemGap: 2,
      } : undefined,
      series: [{
        type: "pie",
        radius: ["52%", "74%"],
        center: ["50%", "52%"],
        padAngle: 1.5,
        itemStyle: { borderRadius: 3, borderColor: "#fff", borderWidth: 1.5 },
        label: {
          color: C.tinta2, fontSize: 8.5, fontFamily: FUENTE, lineHeight: 12,
          formatter: (p) => `{n|${p.name}}\n${fmt((p.value / total) * 100, 0)} %`,
          rich: { n: { color: C.tinta3, fontSize: 8 } },
        },
        labelLine: { length: 8, length2: 8, lineStyle: { color: C.linea } },
        data: o.datos.map((d, i) => ({ name: d.nombre, value: d.valor, itemStyle: { color: color(d, i) } })),
      }],
    });
  }

  // ======================================================================
  // MINI — sparkline para tarjetas KPI (sin ejes)
  // ======================================================================
  function mini(sel, o) {
    const col = color(o, 0);
    dibujar(sel, {
      animation: false,
      grid: { top: 3, right: 3, bottom: 3, left: 3 },
      xAxis: { type: "category", show: false, boundaryGap: false, data: o.datos.map((_, i) => i) },
      yAxis: { type: "value", show: false, min: o.min ?? "dataMin" },
      series: [{
        type: "line", data: o.datos, smooth: 0.3, symbol: "none",
        lineStyle: { width: 1.5, color: col }, areaStyle: { color: degradado(col, 0.18) },
      }],
    });
  }

  window.JVS = { linea, barras, donut, mini, CANAL, SERIES, RAMPA_ORO, COLORES: C, fmt, FORMATOS };
})();
