import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import hero from './hero'
import gallery from './gallery'
import infoTable from './infoTable'
import featureList from './featureList'
import infoGrid from './infoGrid'
import banner from './banner'
import mortgageCalculator from './mortgageCalculator'
import inlineRegisterForm from './inlineRegisterForm'
import locationMap from './locationMap'
import videoSection from './videoSection'

import project3DView from './project3DView'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, hero, gallery, infoTable, featureList, infoGrid, banner, mortgageCalculator, inlineRegisterForm, locationMap, videoSection, project3DView],
}
