import { publicApiClient } from '../http/publicApiClient';

export interface ReportarErrorRequest {
  referenceId: string;
  message: string;
  source: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
}

export interface ReportarErrorResponse {
  key: string;
  url: string;
}

const SOURCE_MARKETPLACE = 'marketplace';

/**
 * Reporta un error al backend para crear un Bug en Jira.
 * POST /api/public/v1/support/report-error
 */
export async function reportarError(datos: Omit<ReportarErrorRequest, 'source'>): Promise<ReportarErrorResponse> {
  const response = await publicApiClient.post<ReportarErrorResponse>('support/report-error', {
    ...datos,
    source: SOURCE_MARKETPLACE,
  });
  return response.data;
}
