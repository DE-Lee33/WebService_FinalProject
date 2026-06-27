
type PlaceItem = {
  id: number
  name: string
  src: string
}

const PLACE_DATA: PlaceItem[] = [
  { id: 1, name: '강원 강릉', src: '/img/list_강원 강릉.jpg' },
  { id: 2, name: '강원 삼척', src: '/img/list_강원 삼척.jpg' },
  { id: 3, name: '강원 정선', src: '/img/list_강원 정선.jpg' },
  { id: 4, name: '강원 춘천', src: '/img/list_강원 춘천.jpg' },
  { id: 5, name: '경기 고양', src: '/img/list_경기 고양.jpg' },
  { id: 6, name: '경기 군포', src: '/img/list_경기 군포.jpg' },
  { id: 7, name: '경기 여주', src: '/img/list_경기 여주.jpg' },
  { id: 8, name: '경상남도 거제', src: '/img/list_경상남도 거제.jpg' },
  { id: 9, name: '경상남도 통영', src: '/img/list_경상남도 통영.jpg' },
  { id: 10, name: '경상북도 경주', src: '/img/list_경상북도 경주.jpg' },
  { id: 11, name: '경상북도 문경', src: '/img/list_경상북도 문경.jpg' },
  { id: 12, name: '경상북도 영덕', src: '/img/list_경상북도 영덕.jpg' },
  { id: 13, name: '광주', src: '/img/list_광주.jpg' },
  { id: 14, name: '대구', src: '/img/list_대구.jpg' },
  { id: 15, name: '대전', src: '/img/list_대전.jpg' },
  { id: 16, name: '부산', src: '/img/list_부산.jpg' },
  { id: 17, name: '서울 강남', src: '/img/list_서울 강남.jpg' },
  { id: 18, name: '서울 광진', src: '/img/list_서울 광진.jpg' },
  { id: 19, name: '서울 동대문', src: '/img/list_서울 동대문.jpg' },
  { id: 20, name: '울산', src: '/img/list_울산.jpg' },
  { id: 21, name: '인천', src: '/img/list_인천.jpg' },
  { id: 22, name: '전라남도 해남', src: '/img/list_전라남도 해남.jpg' },
  { id: 23, name: '전라남도 나주', src: '/img/list_전라남도 나주.jpg' },
  { id: 24, name: '전라북도 고창', src: '/img/list_전라북도 고창.jpg' },
  { id: 25, name: '전라북도 전주', src: '/img/list_전라북도 전주.jpg' },
  { id: 26, name: '제주 서귀포', src: '/img/list_제주 서귀포.jpg' },
  { id: 27, name: '충청남도 부여', src: '/img/list_충청남도 부여.jpg' },
  { id: 28, name: '충청북도 제천', src: '/img/list_충청북도 제천.jpg' },
]

export default function PlacePage() {

  return (
    <section className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-base-content">PLACE</h1>
        <p className="text-sm text-gray-500 mt-2">마우스를 올리면 여행지의 이름을 확인할 수 있습니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PLACE_DATA.map((place) => (
          <div 
            key={place.id} 
            className="group relative w-full h-64 overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-base-200"
            title={place.name} 
          >
  
            <img
              src={place.src}
              alt={place.name}
              title={place.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 pointer-events-none">
              <h3 className="text-white text-lg font-semibold text-center tracking-wide">
                {place.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}