import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { timingSafeEqual } from 'node:crypto';

const allowedContentTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function isAuthorized(suppliedPassword: string | null) {
  const expectedPassword = process.env.MATERIALS_UPLOAD_PASSWORD;
  if (!expectedPassword || !suppliedPassword) return false;

  const expected = Buffer.from(expectedPassword);
  const supplied = Buffer.from(suppliedPassword);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

function hasAllowedPathname(pathname: string) {
  return pathname.startsWith('materials/')
    && pathname.length <= 180
    && /\.(pdf|doc|docx)$/i.test(pathname);
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAuthorized(request.headers.get('x-materials-upload-password'))) {
          throw new Error('등록 권한이 없습니다.');
        }

        if (!hasAllowedPathname(pathname)) {
          throw new Error('허용되지 않은 파일입니다.');
        }

        return {
          allowedContentTypes,
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 60,
          tokenPayload: JSON.stringify({ source: 'materials-library' }),
        };
      },
      onUploadCompleted: async () => {},
    });

    return Response.json(response);
  } catch {
    return Response.json({ error: '자료 업로드 요청을 처리할 수 없습니다.' }, { status: 400 });
  }
}

