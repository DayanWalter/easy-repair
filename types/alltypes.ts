export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          adress: string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
          phone: string | null
        }
        Insert: {
          adress?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Update: {
          adress?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      order_communication: {
        Row: {
          author: string | null
          created_at: string
          id: number
          order_id: number | null
          text: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: number
          order_id?: number | null
          text?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: number
          order_id?: number | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_communication_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          account_access: string | null
          account_access_more: string | null
          again: boolean | null
          article_accessory: string | null
          article_device: string | null
          article_manufacturer: string | null
          comment: string | null
          created_at: string
          customer_id: number | null
          date_done: string | null
          date_start: string | null
          date_taken: string | null
          diagnose: string | null
          employee: string | null
          error_description: string | null
          id: number
          labor_costs: number | null
          material_costs: number | null
          offer: string | null
          old_order_id: string | null
          repair: string | null
          repair_time: string | null
          state: string | null
          total_costs: number | null
          verified: boolean | null
        }
        Insert: {
          account_access?: string | null
          account_access_more?: string | null
          again?: boolean | null
          article_accessory?: string | null
          article_device?: string | null
          article_manufacturer?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: number | null
          date_done?: string | null
          date_start?: string | null
          date_taken?: string | null
          diagnose?: string | null
          employee?: string | null
          error_description?: string | null
          id?: number
          labor_costs?: number | null
          material_costs?: number | null
          offer?: string | null
          old_order_id?: string | null
          repair?: string | null
          repair_time?: string | null
          state?: string | null
          total_costs?: number | null
          verified?: boolean | null
        }
        Update: {
          account_access?: string | null
          account_access_more?: string | null
          again?: boolean | null
          article_accessory?: string | null
          article_device?: string | null
          article_manufacturer?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: number | null
          date_done?: string | null
          date_start?: string | null
          date_taken?: string | null
          diagnose?: string | null
          employee?: string | null
          error_description?: string | null
          id?: number
          labor_costs?: number | null
          material_costs?: number | null
          offer?: string | null
          old_order_id?: string | null
          repair?: string | null
          repair_time?: string | null
          state?: string | null
          total_costs?: number | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          manufacturer: string | null
          name: string
          price: number | null
          sku: string | null
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          manufacturer?: string | null
          name: string
          price?: number | null
          sku?: string | null
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          manufacturer?: string | null
          name?: string
          price?: number | null
          sku?: string | null
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
