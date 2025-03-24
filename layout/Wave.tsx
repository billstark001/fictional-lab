import { useBreakpoint } from "@/lib/responsive";
import useIsClient from "@/lib/react/useIsClient";
import { SVGAttributes, useMemo } from "react";
import seedrandom from "seedrandom";

interface GenerateWaveControlPointsOptions {
  k: number;
  seed: string;
  startHigh: boolean;
  horizontalDelta: number;
  verticalDeltaPeak: number;
  verticalDeltaValley: number;
  verticalStartPeak: number;
  verticalStartValley: number;
}

function generateWaveControlPoints(
  options?: Partial<GenerateWaveControlPointsOptions>
): { x: number; y: number }[] {
  const {
    k = 1,
    seed = 'default',
    startHigh = false,
    horizontalDelta = 0.1,
    verticalDeltaPeak = 0.3,
    verticalDeltaValley = 0.3,
    verticalStartPeak = 1,
    verticalStartValley = 0,
  } = options ?? {};
  const rng = seedrandom(seed);
  const points: { x: number; y: number }[] = [];
  const step = 1 / (2 * k);

  for (let i = 0; i <= 2 * k; i++) {
    const x = i * step + (
      i !== 0 && i !== 2 * k
        ? horizontalDelta * (rng() - 0.5)
        : 0
    );
    const y =
      (startHigh && i % 2 === 0) || (!startHigh && i % 2 !== 0)
        ? (verticalStartPeak - verticalDeltaPeak)
        + verticalDeltaPeak * rng()
        : (verticalStartValley + verticalDeltaValley)
        - verticalDeltaValley * rng();

    points.push({ x, y: 1 - y });
  }

  return points;
}

function generateWaveSVG(controlPoints: { x: number; y: number }[]): string {
  if (controlPoints.length < 2) {
    throw new Error("Not enough points");
  }

  let path = `M ${controlPoints[0].x},${controlPoints[0].y}`;

  for (let i = 0; i < controlPoints.length - 1; i++) {
    const current = controlPoints[i];
    const next = controlPoints[i + 1];

    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;

    // 2nd-order bezier curve
    path += ` Q ${current.x},${current.y} ${midX},${midY}`;
  }

  const lastPoint = controlPoints[controlPoints.length - 1];
  path += ` T ${lastPoint.x},${lastPoint.y}`;

  path += ' L 1,1 L 0,1 Z';

  return path;

}


export const Wave = (props: SVGAttributes<SVGElement>) => {
  const { children, ...rest } = props;

  const bp = useBreakpoint();
  const seed = typeof location === 'undefined' ? '' : location.href;
  const isClient = useIsClient();

  const highVariation = 0.16;
  const lowVariation = 0.02;

  const [d1, d2, d3] = useMemo(() => {
    const controlPoints = generateWaveControlPoints({
      k: bp === 'xl' ? 3 : bp === 'lg' ? 3 : 2,
      seed,
      startHigh: true,
      horizontalDelta: 0.08,
      verticalStartPeak: 1 - highVariation,
      verticalStartValley: 0,
    });
    const d1 = generateWaveSVG(controlPoints.map(({ x, y }, i) => ({
      x, y: i % 2 == 0 ? y - highVariation : y - lowVariation
    })));
    const d2 = generateWaveSVG(controlPoints.map(({ x, y }, i) => ({
      x, y: i % 2 == 0 ? y - highVariation * 0.5 : y - lowVariation * 0.5
    })));
    const d3 = generateWaveSVG(controlPoints);
    return [d1, d2, d3];
  }, [bp, seed, isClient]);

  if (!isClient) {
    return undefined;
  }

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"
    {...rest}>
    <path d={d1} fill="var(--gray-95)" opacity='33%' />
    <path d={d2} fill="var(--gray-95)" opacity='66%' />
    <path d={d3} fill="var(--gray-95)" />
    {children}
  </svg>;
};