export interface DailyPostCommonReponse {
  success: boolean;
  timestamp: Date;
  message: string;
}

// types/post-response.types.ts
export interface DailyPostResponse {
  postId: string;
  content: string;
  mediaUrl?: string | null;
  createdAt: Date;
}

export interface UserPostsResponse {
  status: number;
  success: boolean;
  timestamp: Date;
  data: DailyPostResponse[];
  totalCount: number;
}
