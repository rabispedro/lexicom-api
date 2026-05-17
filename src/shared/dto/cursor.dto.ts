// https://dev.to/juan_castillo/cursor-based-pagination-in-nestjs-with-typeorm-237
export class CursorDto {
  // 'createdAt' of the last item
  cursor?: string;
  limit?: number = 10;
}
