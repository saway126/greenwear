// 블로그 글 생성 관련 타입들
export interface BlogPost {
  id: string
  title: string
  content: string
  keywords: string[]
  category: Category
  tone: Tone
  template: Template
  createdAt: Date
  updatedAt: Date
  isBookmarked: boolean
}

// 카테고리 타입
export type Category = 
  | 'tech' 
  | 'lifestyle' 
  | 'business' 
  | 'health' 
  | 'food' 
  | 'travel' 
  | 'fashion' 
  | 'education'
  | 'entertainment'

export interface CategoryInfo {
  value: Category
  label: string
  icon: string
  description: string
}

// 톤앤매너 타입  
export type Tone = 
  | 'friendly' 
  | 'professional' 
  | 'humorous' 
  | 'formal' 
  | 'casual' 
  | 'enthusiastic'
  | 'persuasive'

export interface ToneInfo {
  value: Tone
  label: string
  description: string
  example: string
}

// 템플릿 타입
export type Template = 
  | 'introduction' 
  | 'review' 
  | 'tutorial' 
  | 'comparison' 
  | 'listicle'
  | 'announcement'
  | 'promotion'
  | 'storytelling'

export interface TemplateInfo {
  value: Template
  label: string
  description: string
  structure: string[]
  example: string
}

// 글 생성 요청 타입
export interface GenerateRequest {
  keywords: string[]
  category: Category
  tone: Tone
  template: Template
  targetLength: number
  includeEmoji: boolean
  includeCTA: boolean
  customPrompt?: string
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 글 생성 응답 타입
export interface GenerateResponse {
  id: string
  title: string
  content: string
  metadata: {
    wordCount: number
    readingTime: number
    seoScore: number
    sentimentScore: number
  }
}

// 통계 타입
export interface Statistics {
  totalPosts: number
  todayPosts: number
  favoriteCategory: Category
  averageLength: number
  mostUsedTone: Tone
  monthlyTrend: Array<{
    month: string
    count: number
  }>
}

// 사용자 설정 타입
export interface UserSettings {
  defaultCategory: Category
  defaultTone: Tone
  defaultTemplate: Template
  autoSave: boolean
  notifications: boolean
  theme: 'light' | 'dark' | 'auto'
}

// 히스토리 필터 타입
export interface HistoryFilter {
  category?: Category
  tone?: Tone
  dateRange?: {
    start: Date
    end: Date
  }
  searchTerm?: string
  bookmarkedOnly?: boolean
} 