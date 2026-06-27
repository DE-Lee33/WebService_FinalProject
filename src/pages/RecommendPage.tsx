import { useState } from 'react'
import MakeSurvey from './makeSurvey'
import PagesTitle from './pagesTitle'
import PlaceRecommend, { type RecommendSnapshot } from './placeRecommend'

export default function RecommendPage() {
  const [recommendSnapshot, setRecommendSnapshot] = useState<RecommendSnapshot | null>(null)

  return (
    <>
      <PagesTitle />
      <MakeSurvey 
        onRecommendStart={(snap) => setRecommendSnapshot(snap)}
        onRecommendReset={() => setRecommendSnapshot(null)}
      />
      <PlaceRecommend snapshot={recommendSnapshot} />
    </>
  )
}
