/**
 * Error Boundary para capturar errores de React no manejados.
 * Evita que un error en un componente rompa toda la aplicación.
 * 
 * Versión para el marketplace público con soporte i18n.
 * "Reportar problema" envía el error a Jira como Bug.
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Ticket, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import i18n from '@/shared/i18n';
import { reportarError } from '@/services/endpoints/support.api';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Componente personalizado para mostrar en caso de error */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorId: string;
  timestamp: string;
  copied: boolean;
  reportSending: boolean;
  reportSuccess: { key: string; url: string } | null;
  reportError: string | null;
}

// Genera un ID corto para el error
function generateErrorId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      errorId: '',
      timestamp: '',
      copied: false,
      reportSending: false,
      reportSuccess: null,
      reportError: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { 
      hasError: true, 
      error,
      errorId: generateErrorId(),
      timestamp: new Date().toISOString()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log del error para debugging
    console.error('[ErrorBoundary] Error capturado:', {
      errorId: this.state.errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: this.state.timestamp
    });
  }

  handleRetry = (): void => {
    this.setState({ 
      hasError: false, 
      error: undefined,
      errorId: '',
      timestamp: '',
      copied: false,
      reportSending: false,
      reportSuccess: null,
      reportError: null,
    });
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  handleCopyErrorId = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(this.state.errorId);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch {
      console.log('Error ID:', this.state.errorId);
    }
  };

  handleCreateTicket = async (): Promise<void> => {
    if (this.state.reportSending || this.state.reportSuccess) return;
    this.setState({ reportSending: true, reportError: null });
    try {
      const result = await reportarError({
        referenceId: this.state.errorId,
        message: this.state.error?.message ?? '',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: this.state.timestamp,
      });
      this.setState({ reportSending: false, reportSuccess: { key: result.key, url: result.url } });
    } catch {
      this.setState({
        reportSending: false,
        reportError: i18n.t('errorBoundary.reportError'),
      });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { errorId, copied } = this.state;

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-background">
          <div className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full shadow-lg">
            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
            </div>

            {/* Título y mensaje */}
            <h2 className="text-xl font-semibold text-text mb-2">
              {i18n.t('errorBoundary.title')}
            </h2>
            <p className="text-text-muted mb-4">
              {i18n.t('errorBoundary.message')}
            </p>

            {/* ID de referencia */}
            <div className="mb-6 p-3 bg-background rounded-lg border border-border">
              <p className="text-xs text-text-muted mb-1">
                {i18n.t('errorBoundary.referenceId')}
              </p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-sm font-mono text-text font-semibold">
                  {errorId}
                </code>
                <button
                  onClick={this.handleCopyErrorId}
                  className="p-1 rounded hover:bg-surface-hover transition-colors"
                  title={i18n.t('common.copy')}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-text-muted" />
                  )}
                </button>
              </div>
              <p className="text-xs text-text-muted mt-1">
                {i18n.t('errorBoundary.referenceHint')}
              </p>
            </div>

            {/* Detalles del error (solo en desarrollo) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-text-muted cursor-pointer hover:text-text">
                  {i18n.t('errorBoundary.technicalDetails')}
                </summary>
                <pre className="mt-2 p-3 bg-background rounded-lg text-xs text-error overflow-auto max-h-32 border border-border">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            {/* Acciones principales */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Button
                variante="outline"
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {i18n.t('errorBoundary.retry')}
              </Button>
              <Button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                {i18n.t('errorBoundary.goHome')}
              </Button>
            </div>

            {/* Mensaje de éxito al reportar */}
            {this.state.reportSuccess && (
              <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-lg text-sm text-text">
                <p className="font-medium">{i18n.t('errorBoundary.reportSent')}</p>
                <a
                  href={this.state.reportSuccess.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-primary hover:underline"
                >
                  {this.state.reportSuccess.key}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Mensaje de error al reportar */}
            {this.state.reportError && (
              <p className="mb-4 text-sm text-error">{this.state.reportError}</p>
            )}

            {/* Botón de crear ticket */}
            <button
              onClick={this.handleCreateTicket}
              disabled={this.state.reportSending || !!this.state.reportSuccess}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-text-muted hover:text-text hover:bg-background rounded-lg transition-colors border border-transparent hover:border-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Ticket className="w-4 h-4" />
              {this.state.reportSending
                ? i18n.t('errorBoundary.reportSending')
                : this.state.reportSuccess
                  ? i18n.t('errorBoundary.viewTicket')
                  : i18n.t('errorBoundary.reportProblem')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
