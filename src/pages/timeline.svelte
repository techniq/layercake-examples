<script>
  import { LayerCake, Svg, calcExtents } from 'layercake';
  import { timeDay } from 'd3-time';
  import { scaleBand } from 'd3-scale';

  import Scatter from '../components/Scatter.svelte';
  import AxisX from '../components/AxisX.svelte';
  import AxisY from '../components/AxisY.svelte';

  import data from '../data/days.csv';

  const xKey = 'seconds';
  const yKey = 'day';

  const r = 4;
  const padding = 2;

  const daysTransformed = data.map((d) => {
    const [date, time] = d.timestring.split('T');
    const [hours, minutes, seconds] = time
      .replace('Z', '')
      .split(':')
      .map((q) => +q);

    return {
      ...d,
      [xKey]: hours * 60 * 60 + minutes * 60 + seconds,
      [yKey]: date,
    };
  });

  /* --------------------------------------------
   * Generate a range of days in between the min and max
   * in case we are missing any in our data so we can show empty days for them
   */
  const extents = calcExtents(daysTransformed, [
    { field: 'x', accessor: (d) => d.timestring },
  ]);

  const minDate = extents.x[0]
    .split('T')[0]
    .split('-')
    .map((d) => +d);
  const maxDate = extents.x[1]
    .split('T')[0]
    .split('-')
    .map((d) => +d);

  const allDays = timeDay
    .range(
      new Date(Date.UTC(minDate[0], minDate[1] - 1, minDate[2])),
      new Date(Date.UTC(maxDate[0], maxDate[1] - 1, maxDate[2] + 1))
    )
    .map((d) => d.toISOString().split('T')[0])
    .sort()
    .reverse();
</script>

<div class="w-full h-full">
  <LayerCake
    padding={{ top: 0, right: 15, bottom: 20, left: 75 }}
    x={xKey}
    y={yKey}
    xDomain={[0, 24 * 60 * 60]}
    yDomain={allDays}
    yScale={scaleBand().paddingInner([0.05]).round(true)}
    xPadding={[padding, padding]}
    data={daysTransformed}
  >

    <Svg>
      <AxisX
        ticks={[0, 4, 8, 12, 16, 20, 24].map((d) => d * 60 * 60)}
        formatTick={(d) => `${Math.floor(d / 60 / 60)}:00`}
      />
      <AxisY />
      <Scatter
        {r}
        fill="rgba(255, 204, 0, 0.75)"
        dy={(scale) => scale.bandwidth() / 2}
      />
    </Svg>

  </LayerCake>
</div>
