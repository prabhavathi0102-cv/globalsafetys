
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.next_invoice_no() RETURNS TEXT
LANGUAGE plpgsql SET search_path = public AS $$
DECLARE n BIGINT;
BEGIN
  n := nextval('public.invoice_seq');
  RETURN 'GSE-INV-' || to_char(now(),'YYYYMM') || '-' || lpad(n::TEXT, 4, '0');
END; $$;

REVOKE EXECUTE ON FUNCTION public.next_invoice_no() FROM PUBLIC, anon, authenticated;
