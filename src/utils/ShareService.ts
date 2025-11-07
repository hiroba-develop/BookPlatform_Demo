export interface ShareData {
    title: string;
    text: string;
    url: string;
  }
  
  class ShareService {
    isSupported(): boolean {
      return typeof navigator !== 'undefined' && !!navigator.share;
    }
  
    async share(data: ShareData): Promise<boolean> {
      if (!this.isSupported()) {
        console.warn('Web Share API is not supported');
        return false;
      }
  
      try {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url
        });
        console.log('✅ シェア成功');
        return true;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          console.log('シェアがキャンセルされました');
        } else {
          console.error('シェアエラー:', error);
        }
        return false;
      }
    }
  
    async shareInvite(inviterName?: string): Promise<boolean> {
      const shareData: ShareData = {
        title: 'BOOK DESIGNに招待します',
        text: inviterName 
          ? `${inviterName}さんからBOOK DESIGNへの招待です！\n読書記録を管理・共有して、一緒に読書ライフを楽しみましょう📚`
          : 'BOOK DESIGNで読書記録を管理・共有しませんか？📚',
        url: `${window.location.origin}/signup?ref=invite`
      };
  
      return this.share(shareData);
    }
  
    async copyToClipboard(url: string): Promise<boolean> {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (error) {
        console.error('クリップボードへのコピーに失敗:', error);
        return false;
      }
    }
  }
  
  export const shareService = new ShareService();