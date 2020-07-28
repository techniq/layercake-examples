<script>
  import { getContext } from 'svelte';
  import * as Sankey from 'd3-sankey';

  const { data, width, height } = getContext('LayerCake');

  export let colorLinks = (d) => 'rgba(0, 0, 0, .2)';
  export let colorNodes = (d) => '#333';
  export let colorText = (d) => '#263238';

  export let nodeWidth = 5;
  export let nodePadding = 10;
  export let linkSort = undefined;
  export let nodeId = (d) => d.id;
  export let nodeAlign = Sankey.sankeyJustify;

  $: sankey = Sankey.sankey()
    .nodeAlign(nodeAlign)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodeId(nodeId)
    .size([$width, $height])
    .linkSort(linkSort);

  $: sankeyData = sankey($data);

  $: link = Sankey.sankeyLinkHorizontal();

  $: fontSize = $width <= 320 ? 8 : 12;

  let highlightLinkIndexes = [];
</script>

<g class="sankey-layer">
  <g class="link-group">
    {#each sankeyData.links as d, i}
      <path
        d={link(d)}
        _stroke={colorLinks(d)}
        stroke={highlightLinkIndexes.includes(i) ? 'red' : 'black'}
        stroke-width={Math.max(1, d.width)}
        stroke-opacity={highlightLinkIndexes.includes(i) ? 0.5 : 0.1}
        fill="none"
        on:mouseover={(e) => (highlightLinkIndexes = [i])}
        on:mouseout={(e) => (highlightLinkIndexes = [])}
      />
    {/each}
  </g>
  <g class="rect-group">
    {#each sankeyData.nodes as d, i}
      <rect
        x={d.x0}
        y={d.y0}
        height={d.y1 - d.y0}
        width={d.x1 - d.x0}
        fill={colorNodes(d)}
        on:mouseover={(e) => {
          highlightLinkIndexes = [...d.sourceLinks.map((l) => l.index), ...d.targetLinks.map((l) => l.index)];
        }}
        on:mouseout={(e) => {
          highlightLinkIndexes = [];
        }}
      />
      <text
        x={d.x0 < $width / 4 ? d.x1 + 6 : d.x0 - 6}
        y={(d.y1 + d.y0) / 2}
        dy={fontSize / 2 - 2}
        style="fill: {colorText(d)}; font-size: {fontSize}px; text-anchor: {d.x0 < $width / 4 ? 'start' : 'end'};"
      >
        <!-- TODO: Use nodeId? -->
        {d.name}
      </text>
    {/each}
  </g>
</g>

<style>
  text {
    pointer-events: none;
  }
</style>
