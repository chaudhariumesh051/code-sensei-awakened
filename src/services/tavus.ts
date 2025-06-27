
const TAVUS_API_URL = 'https://tavusapi.com/v2';

interface TavusVideoRequest {
  replica_id: string;
  script: string;
  video_name?: string;
  background_url?: string;
  callback_url?: string;
}

interface TavusVideoResponse {
  video_id: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  download_url?: string;
  landing_page_url?: string;
}

export class TavusService {
  private static getApiKey(): string {
    // In a real app, this would come from environment variables
    // For now, return empty string to avoid errors
    return '';
  }

  static async generateVideo(request: TavusVideoRequest): Promise<TavusVideoResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Tavus API key not configured');
    }

    const response = await fetch(`${TAVUS_API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async getVideoStatus(videoId: string): Promise<TavusVideoResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Tavus API key not configured');
    }

    const response = await fetch(`${TAVUS_API_URL}/videos/${videoId}`, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async createReplica(videoFile: File, name: string): Promise<{ replica_id: string }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Tavus API key not configured');
    }

    const formData = new FormData();
    formData.append('train_video_file', videoFile);
    formData.append('replica_name', name);

    const response = await fetch(`${TAVUS_API_URL}/replicas`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async listReplicas(): Promise<{ replicas: Array<{ replica_id: string; replica_name: string; status: string }> }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('Tavus API key not configured');
    }

    const response = await fetch(`${TAVUS_API_URL}/replicas`, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }
}
