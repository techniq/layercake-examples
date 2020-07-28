<script>
  import { LayerCake, Svg } from 'layercake';

  import Sankey from '../components/Sankey.svelte';

  import data from '../data/sankey-data';
</script>

<div class="w-full h-full">
  <LayerCake {data}>
    <Svg>
      <Sankey colorNodes={(d) => '#989898'} nodeId={(d, i) => i} nodeWidth={15} />
    </Svg>
  </LayerCake>
</div>
