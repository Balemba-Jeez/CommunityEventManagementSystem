interface Zone {
  id: string
  name: string
}

interface Event {
  id: string
  name: string
}

// API service class that can be easily configured for different environments
export class ApiService {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  // Zones API
  async getZones(): Promise<Zone[]> {
    try {
      const response = await fetch(`${this.baseUrl}/zones`)
      if (!response.ok) throw new Error("Failed to fetch zones")
      return await response.json()
    } catch (error) {
      console.error("Error fetching zones:", error)
      throw error
    }
  }

  // Global Events API
  async getGlobalEvents(): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/events/global`)
      if (!response.ok) throw new Error("Failed to fetch global events")
      return await response.json()
    } catch (error) {
      console.error("Error fetching global events:", error)
      throw error
    }
  }

  // Zone Events API
  async getZoneEvents(zoneId: string): Promise<Event[]> {
    try {
      const response = await fetch(`${this.baseUrl}/zones/${zoneId}/events`)
      if (!response.ok) throw new Error(`Failed to fetch events for zone ${zoneId}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching zone events for ${zoneId}:`, error)
      throw error
    }
  }

  // Search Events API (bonus feature for filtering)
  async searchEvents(query: string, zoneId?: string): Promise<Event[]> {
    try {
      const params = new URLSearchParams({ q: query })
      if (zoneId) params.append("zoneId", zoneId)

      const response = await fetch(`${this.baseUrl}/events/search?${params}`)
      if (!response.ok) throw new Error("Failed to search events")
      return await response.json()
    } catch (error) {
      console.error("Error searching events:", error)
      throw error
    }
  }
}

// Export a default instance
export const apiService = new ApiService()

// Hook for easy integration with React components
export const useApiService = () => {
  return apiService
}
