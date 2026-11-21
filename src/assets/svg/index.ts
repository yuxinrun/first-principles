import iconsRaw from './icons.svg?raw'
import logo from './logo.svg?raw'
import thinkingFlow from './thinking-flow.svg?raw'
import problemBreakdown from './problem-breakdown.svg?raw'
import factAssumption from './fact-assumption.svg?raw'
import axiomDerivation from './axiom-derivation.svg?raw'
import logicTree from './logic-tree.svg?raw'
import causalMap from './causal-map.svg?raw'
import scientificMethod from './scientific-method.svg?raw'
import systemsThinking from './systems-thinking.svg?raw'
import costBreakdown from './cost-breakdown.svg?raw'
import rocket from './rocket.svg?raw'
import battery from './battery.svg?raw'
import geometry from './geometry.svg?raw'
import learningPath from './learning-path.svg?raw'
import heroArt from './hero-art.svg?raw'

export const iconsRawSvg = iconsRaw

export const art = {
  logo,
  thinkingFlow,
  problemBreakdown,
  factAssumption,
  axiomDerivation,
  logicTree,
  causalMap,
  scientificMethod,
  systemsThinking,
  costBreakdown,
  rocket,
  battery,
  geometry,
  learningPath,
  heroArt,
}

export type ArtKey = keyof typeof art
