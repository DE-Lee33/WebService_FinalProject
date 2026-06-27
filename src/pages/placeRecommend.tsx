import { useDispatch, useSelector } from 'react-redux'
import { addToCart, type RootState } from '../data/store'
import axios from 'axios'

export type TravelChoice = 'A' | 'B'

export type TravelProfile = 'dynamic' | 'wellness' | 'traditional'

export type RecommendSnapshot = {
  travelAnswers: TravelChoice[]
}

export type Destination = {
  name: string
  src?: string 
  place?: string
  food?: string
  summary?: string
}

type ProfileContent = {
  emoji: string
  title: string
  description: string
  destinations: Destination[]
}

const PROFILES: Record<TravelProfile, ProfileContent> = {
  dynamic: {
    emoji: '✨',
    title: '[트렌디 & 다이내믹] 에너제틱 여행',
    description:
      '핫플레이스와 서핑, 출사 등 눈과 귀가 즐거운 역동적인 여행이 어울리는 성향',
    destinations: [
      { 
        name: '양양',
        src: '/img/추천_양양.jpg',
        place: '낙산사, 양양전통시장, 낙산해수욕장',
        food: '감나무식당, 바다뷰제빵소',
        summary:
          '이국적인 프라이빗 비치에서 즐기는 서핑과 화려한 인생샷',
      },
      {
        name: '수원',
        src: '/img/추천_수원.jpg',
        place: '행리단길, 수원화성, 화성어차',
        food: '가보정갈비',
        summary:
          '과거와 현재가 공존하는 성곽길을 배경으로 남기는 감성 사진',
      },
      {
        name: '묵호',
        src: '/img/추천_묵호.jpg',
        place: '묵호항, 망상해수용장, 무릉별유천지',
        food: '거동탕수육, 오뚜기칼국수',
        summary: '푸른 바다와 이색 액티비티로 즐거운 눈과 귀'
      },
    ],
  },
  
  wellness: {
    emoji: '🌿',
    title: '[휴식 & 웰니스] 스테이케이션 여행',
    description:
      '여유로운 휴식과 자연 속에서의 힐링, 복합 문화 공간에서의 정적인 시간을 선호하는 성향',
    destinations: [
      {
        name: '제주',
        src: '/img/추천_제주.jpg',
        place: '함덕 해수욕장, 비자림, 만장굴',
        food: '우진해장국, 제주당베이커리카페',
        summary:
          '에메랄드빛 바다를 바라보며 즐기는 온전한 휴식',
      },
      {
        name: '파주',
        src: '/img/추천_파주.jpg',
        place: '헤이리 예술마을, 파주 임진각, 제3땅굴',
        food: '문지리535, 심학산도토리국수',
        summary:
          '조용한 공간에서 차분하게 생각을 정리하는 시간',
      },
      {
        name: '영월',
        src: '/img/추천_영월.jpg',
        place: '청령포, 별마로천문대',
        food: '다슬기향촌성호식당, 장릉보리밥집',
        summary: '고즈넉한 숲길과 별빛 아래 마음 비우기'
      },
    ],
  },

  traditional: {
    emoji: '🪵',
    title: '[전통 & 건강] 깊이 있는 역사·문화 여행',
    description:
      '유서 깊은 문화유산과 수려한 자연 경관, 건강한 로컬 푸드를 선호하는 성향',
    destinations: [
      {
        name: '영주',
        src: '/img/추천_영주.jpg',
        place: '부석사, 무섬마을, 소수서원',
        food: '순흥전통묵집, 풍기인삼갈비',
        summary:
          '아름다운 목조 건물에서 백두대간의 능선을 한눈에 담으며 느끼는 마음의 평온',
      },
    ],
  },
}

export function resolveTravelProfile(answers: TravelChoice[]): TravelProfile {
  const aCount = answers.filter(c => c === 'A').length
  const bCount = answers.filter(c => c === 'B').length

  if (bCount >= 3) return 'traditional'
  if (aCount > bCount) return 'dynamic'
  if (bCount > aCount) return 'wellness'
  return 'wellness'
}

type Props = {
  snapshot: RecommendSnapshot | null
}

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  const dispatch = useDispatch()
  const inCart = useSelector((state: RootState) =>
    state.cart.cartA.some((item) => item.name === destination.name)
  )

  const handleAddToCart = async () => {
 
    const newItem = {
      id: destination.name,
      name: destination.name,
      summary: destination.summary,
    };

    dispatch(addToCart(newItem));

    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post(
      'http://localhost:5000/api/cart/add',
      newItem,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  return (
    <article className="flex flex-col h-full gap-3 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm max-w-[400px] min-w-[400px] max-h-[600px] min-h-[600px]">
      
      {destination.src && (
        <div className="w-full h-48 overflow-hidden rounded-lg mb-1">
          <img 
            src={destination.src} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="text-base font-semibold text-base-content">
        추천 여행지 {index}: {destination.name}
      </h3>
      {destination.place && (
        <p className="text-sm text-base-content/80">
          <span className="font-medium text-base-content">가볼만한곳:</span> {destination.place}
        </p>
      )}
      {destination.food && (
        <p className="text-sm text-base-content/80">
          <span className="font-medium text-base-content">먹거리 PICK:</span> {destination.food}
        </p>
      )}
      {destination.summary && (
        <p className="text-sm text-base-content/80">
          <span className="font-medium text-base-content">한줄평:</span> {destination.summary}
        </p>
      )}

      <button
        type="button"
        className={`mt-2 w-full rounded-lg py-2 text-sm text-white ${
          inCart
            ? 'bg-primary hover:bg-primary/90'
            : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={handleAddToCart}
        disabled={inCart}
      >
        {inCart ? 'ADDED TO CART' : 'ADD TO CART'}

      </button>
    </article>
  )
}

export default function PlaceRecommend({ snapshot }: Props) {
  if (!snapshot?.travelAnswers?.length) return null

  const profileKey = resolveTravelProfile(snapshot.travelAnswers)
  const profile = PROFILES[profileKey]

  return (
    <section className="container mx-auto mt-10 w-full max-w-6xl px-4 pb-20">
      <h2 className="text-xl font-semibold text-base-content">여행지 추천</h2>
      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-lg font-semibold text-base-content">
          {profile.emoji} {profile.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-base-content/80">{profile.description}</p>
      </div>
      
      <div className="recommend-grid mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch
                    ${profile.destinations.length === 1 ? 'md:grid-cols-1 lg:grid-cols-1 justify-items-center' : ''}`}">
        {profile.destinations.map((destination, i) => (
          <DestinationCard key={destination.name} destination={destination} index={i + 1} />
        ))}
      </div>
    </section>
  )
}