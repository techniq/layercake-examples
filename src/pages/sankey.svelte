<script>
  import { LayerCake, Svg } from 'layercake';

  import Sankey from '../components/Sankey.svelte';

  import data from '../data/sankey-data';
</script>

<div class="chart-container">
  <LayerCake {data}>
    <Svg>
      <Sankey colorNodes={(d) => '#989898'} nodeId={(d, i) => i} />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
