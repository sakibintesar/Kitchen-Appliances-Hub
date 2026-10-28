/**
 * SSLCommerz Payment Gateway Integration
 * Bangladesh's most popular payment aggregator supporting:
 * - bKash, Nagad, Rocket (Mobile Financial Services)
 * - Credit/Debit Cards (Visa, Mastercard, Amex)
 * - Internet Banking (30+ banks)
 * - Bank Transfer
 * 
 * Docs: https://developer.sslcommerz.com/
 */

export interface SSLCommerzConfig {
  storeId: string;
  storePassword: string;
  isSandbox: boolean;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
}

export interface SSLCommerzInitRequest {
  total_amount: number;
  currency: 'BDT' | 'USD';
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  cus_add1: string;
  cus_city: string;
  cus_postcode: string;
  cus_country: string;
  ship_name: string;
  ship_add1: string;
  ship_city: string;
  ship_postcode: string;
  ship_country: string;
  product_category: string;
  product_profile: 'general' | 'physical_goods' | 'digital_goods';
  product_name: string;
  num_of_item: number;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
  emi_option?: 0 | 1;
  emi_max_inst_option?: number;
  emi_selected_inst?: number;
}

export interface SSLCommerzInitResponse {
  status: 'SUCCESS' | 'FAILED';
  sessionkey?: string;
  GatewayPageURL?: string;
  failedreason?: string;
}

export interface SSLCommerzValidationResponse {
  status: 'VALID' | 'VALIDATED' | 'INVALID' | 'FAILED';
  tran_id: string;
  val_id: string;
  amount: number;
  currency: string;
  card_type?: string;
  card_no?: string;
  card_issuer?: string;
  card_brand?: string;
  card_issuer_country?: string;
  card_issuer_country_code?: string;
  bank_tran_id?: string;
  card_sub_type?: string;
  currency_type?: string;
  currency_amount?: number;
  currency_rate?: number;
  base_fair?: number;
  risk_level?: string;
  risk_title?: string;
  EMI_amount?: number;
  EMI_inst?: number;
  EMI_issuer?: string;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
  tran_date: string;
}

export interface SSLCommerzIPNPayload {
  val_id: string;
  tran_id: string;
  amount: string;
  currency: string;
  card_type: string;
  card_no: string;
  card_issuer: string;
  card_brand: string;
  card_issuer_country: string;
  card_issuer_country_code: string;
  bank_tran_id: string;
  card_sub_type: string;
  currency_type: string;
  currency_amount: string;
  currency_rate: string;
  base_fair: string;
  risk_level: string;
  risk_title: string;
  EMI_amount: string;
  EMI_inst: string;
  EMI_issuer: string;
  value_a: string;
  value_b: string;
  value_c: string;
  value_d: string;
  tran_date: string;
  status: 'VALID' | 'VALIDATED' | 'FAILED' | 'CANCELLED';
}

const SANDBOX_BASE = 'https://sandbox.sslcommerz.com';
const LIVE_BASE = 'https://securepay.sslcommerz.com';

export class SSLCommerzGateway {
  private config: SSLCommerzConfig;
  private baseUrl: string;

  constructor(config: SSLCommerzConfig) {
    this.config = config;
    this.baseUrl = config.isSandbox ? SANDBOX_BASE : LIVE_BASE;
  }

  async initPayment(request: SSLCommerzInitRequest): Promise<SSLCommerzInitResponse> {
    const params = new URLSearchParams({
      store_id: this.config.storeId,
      store_passwd: this.config.storePassword,
      total_amount: String(request.total_amount),
      currency: request.currency,
      tran_id: request.tran_id,
      success_url: request.success_url,
      fail_url: request.fail_url,
      cancel_url: request.cancel_url,
      ipn_url: request.ipn_url,
      cus_name: request.cus_name,
      cus_email: request.cus_email,
      cus_phone: request.cus_phone,
      cus_add1: request.cus_add1,
      cus_city: request.cus_city,
      cus_postcode: request.cus_postcode,
      cus_country: request.cus_country,
      ship_name: request.ship_name,
      ship_add1: request.ship_add1,
      ship_city: request.ship_city,
      ship_postcode: request.ship_postcode,
      ship_country: request.ship_country,
      product_category: request.product_category,
      product_profile: request.product_profile,
      product_name: request.product_name,
      num_of_item: String(request.num_of_item),
      emi_option: String(request.emi_option || 0),
    });

    if (request.value_a) params.append('value_a', request.value_a);
    if (request.value_b) params.append('value_b', request.value_b);
    if (request.value_c) params.append('value_c', request.value_c);
    if (request.value_d) params.append('value_d', request.value_d);

    const response = await fetch(`${this.baseUrl}/gwprocess/v4/api.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    return response.json() as Promise<SSLCommerzInitResponse>;
  }

  async validatePayment(valId: string): Promise<SSLCommerzValidationResponse> {
    const params = new URLSearchParams({
      store_id: this.config.storeId,
      store_passwd: this.config.storePassword,
      val_id: valId,
      format: 'json',
    });

    const response = await fetch(`${this.baseUrl}/validator/api/validationserverAPI.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    return response.json() as Promise<SSLCommerzValidationResponse>;
  }

  async verifyIPN(payload: SSLCommerzIPNPayload): Promise<SSLCommerzValidationResponse> {
    return this.validatePayment(payload.val_id);
  }

  static generateTranId(prefix = 'KH'): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  static buildInitRequest(
    config: SSLCommerzConfig,
    orderData: {
      orderId: number;
      orderNumber: string;
      email: string;
      name: string;
      phone: string;
      shippingAddress: { address1: string; city: string; zip: string; country: string };
      lines: Array<{ title: string; quantity: number; price: number }>;
      totalAmount: number;
    }
  ): SSLCommerzInitRequest {
    const tranId = this.generateTranId();
    const productName = orderData.lines.map(l => `${l.title} x${l.quantity}`).join(', ');
    const numItems = orderData.lines.reduce((sum, l) => sum + l.quantity, 0);

    return {
      total_amount: orderData.totalAmount / 100,
      currency: 'BDT',
      tran_id: tranId,
      success_url: config.successUrl,
      fail_url: config.failUrl,
      cancel_url: config.cancelUrl,
      ipn_url: config.ipnUrl,
      cus_name: orderData.name,
      cus_email: orderData.email,
      cus_phone: orderData.phone,
      cus_add1: orderData.shippingAddress.address1,
      cus_city: orderData.shippingAddress.city,
      cus_postcode: orderData.shippingAddress.zip,
      cus_country: orderData.shippingAddress.country,
      ship_name: orderData.name,
      ship_add1: orderData.shippingAddress.address1,
      ship_city: orderData.shippingAddress.city,
      ship_postcode: orderData.shippingAddress.zip,
      ship_country: orderData.shippingAddress.country,
      product_category: 'Electronics',
      product_profile: 'physical_goods',
      product_name: productName,
      num_of_item: numItems,
      value_a: String(orderData.orderId),
      value_b: 'sslcommerz',
    };
  }
}

export function paisaToBdt(paisa: number): number { return paisa / 100; }
export function bdtToPaisa(bdt: number): number { return Math.round(bdt * 100); }