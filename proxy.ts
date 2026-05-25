import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  // Proxy is used in Next.js 16 to replace the deprecated middleware convention
  // Currently handles simple pass-through for future custom routing rules
  return NextResponse.next({ request })
}
