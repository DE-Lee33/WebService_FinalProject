import { useState, useCallback } from 'react'
import type { RecommendSnapshot, TravelChoice } from './placeRecommend'

type Props = {
  onRecommendStart: (snapshot: RecommendSnapshot) => void
  onRecommendReset: () => void
}

type Question = {
  question: string
  a: string
  b: string
}

const QUESTIONS: Question[] = [
  {
    question: '드디어 기다리던 여행 당일 아침! 내가 꿈꾸는 완벽한 여행의 시작은?',
    a: '"남는 건 사진과 짜릿한 경험뿐!" 핫플레이스나 액티비티를 즐기러 갈 생각에 벌써부터 에너지가 솟구친다.',
    b: '"일상의 알람은 다 꺼두자." 조용하고 아늑한 숙소나 자연 속에서 온전히 나만의 시간을 보낼 생각에 마음이 편안해진다.',
  },
  {
    question: '여행지에 도착해서 가장 먼저 걷고 싶은 길은?',
    a: '예쁜 카페와 아기자기한 소품샵, 또는 이국적인 팝업스토어가 가득한 감성 가득한 거리.',
    b: '깊은 역사가 살아 숨 쉬는 고즈넉한 성곽길, 푸른 바다, 혹은 피톤치드가 뿜어져 나오는 울창한 숲길.',
  },
  {
    question: "여행 중 마주친 '인생 맛집'을 고른다면 내 취향은?",
    a: '요즘 SNS에서 가장 핫한 비주얼 폭발 맛집이나 탁 트인 뷰가 매력적인 대형 베이커리 카페.',
    b: '오랜 세월 자리를 지켜온 전통 시장의 로컬 맛집이나 깊은 손맛이 느껴지는 든든한 건강식 한 상 차림.',
  },
  {
    question: '이번 여행을 마치고 집으로 돌아갈 때, 내가 가장 얻고 싶은 것은?',
    a: '카메라 갤러리를 가득 채운 멋진 인생샷과 트렌디한 장소를 정복했다는 성취감.',
    b: '지친 몸과 마음을 맑게 비워내고 다시 일상을 살아갈 힘을 얻는 온전한 리프레시.',
  },
]

export default function MakeSurvey({ onRecommendStart, onRecommendReset }: Props) {
  const [testStarted, setTestStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<TravelChoice[]>([])
  const [hasClickedRecommend, setHasClickedRecommend] = useState(false)

  const resetSurvey = useCallback(() => {
    setTestStarted(false)
    setCurrentIndex(0)
    setAnswers([])
    setHasClickedRecommend(false)
  }, [])

  const handleChoice = useCallback((choice: TravelChoice) => {
    setAnswers(prev => {
      const next = [...prev, choice]
      if (next.length < QUESTIONS.length) {
        setCurrentIndex(next.length)
      }
      return next
    })
  }, [])

  const testComplete = answers.length === QUESTIONS.length
  const currentQuestion = QUESTIONS[currentIndex]

  return (
    <div className="container mx-auto pb-20">
      <form
        className="mx-auto mt-12 max-w-2xl p-6 border rounded-xl shadow-md bg-white"
        onSubmit={e => {
          e.preventDefault()
          if (!testComplete) return
          const snapshot: RecommendSnapshot = { travelAnswers: answers }
          onRecommendStart(snapshot)
          setHasClickedRecommend(true)
        }}
      >
        <fieldset className="space-y-6">
          {!testStarted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <p className="text-lg font-semibold text-gray-800">테스트 시작하기</p>
              <button
                type="button"
                className="btn btn-primary px-8"
                onClick={() => setTestStarted(true)}
              >
                시작
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-1 text-center">
                <h2 className="text-lg font-semibold">✈️ 여행 성향 TEST</h2>
                <p className="text-sm text-gray-600">
                  각 질문에서 자신에게 더 끌리는 선택지를 선택하세요
                </p>
              </div>

              {!testComplete && currentQuestion && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-primary">
                    Q{currentIndex + 1}. {currentQuestion.question}
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="btn btn-outline justify-start h-auto min-h-0 whitespace-pre-wrap py-4 text-left"
                      onClick={() => handleChoice('A')}
                    >
                      <span className="font-semibold text-primary">A.</span>{' '}
                      {currentQuestion.a}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline justify-start h-auto min-h-0 whitespace-pre-wrap py-4 text-left"
                      onClick={() => handleChoice('B')}
                    >
                      <span className="font-semibold text-primary">B.</span>{' '}
                      {currentQuestion.b}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500">
                    {currentIndex + 1} / {QUESTIONS.length}
                  </p>
                </div>
              )}

              {testComplete && (
                <>
                  <p className="rounded-lg bg-slate-50 px-4 py-3 text-center text-sm text-gray-700">
                    테스트가 완료되었어요! 아래 버튼으로 여행지 추천을 받아보세요.
                  </p>
                  {hasClickedRecommend ? (
                    <button
                      type="button"
                      className="btn btn-primary w-full"
                      onClick={() => {
                        onRecommendReset()
                        resetSurvey()
                      }}
                    >
                      다시 시작하기
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary w-full">
                      이 정보로 추천 시작하기
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </fieldset>
      </form>
    </div>
  )
}
