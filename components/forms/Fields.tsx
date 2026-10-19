import { createContext, useContext, type ReactNode, type RefObject } from "react";
import styles from "./Form.module.css";

type Base = {
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
};

/** Prefix applied to element ids so two forms can share a page without id collisions. */
export const FormIdContext = createContext("");
const useFieldId = (name: string) => `${useContext(FormIdContext)}${name}`;

const describedBy = (name: string, hint?: ReactNode, error?: string) =>
  [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;

function RequiredMark({ required }: { required?: boolean }) {
  return required ? (
    <span className={styles.req} aria-hidden="true">
      {" "}
      *
    </span>
  ) : (
    <span className={styles.optional}> (optional)</span>
  );
}

function Meta({ name, hint, error }: { name: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${name}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className={styles.error}>
          <span className={styles.errorIcon} aria-hidden="true">
            !
          </span>
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  ...p
}: Base & { type?: string; autoComplete?: string; inputMode?: "email" | "tel" | "url" | "text" }) {
  const id = useFieldId(p.name);
  return (
    <div className={`${styles.field} ${p.error ? styles.invalid : ""} ${p.className ?? ""}`}>
      <label htmlFor={id} className={styles.label}>
        {p.label}
        <RequiredMark required={p.required} />
      </label>
      <input
        id={id}
        name={p.name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.hint, p.error)}
        className={styles.input}
      />
      <Meta name={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function SelectField({
  options,
  placeholder = "Please select",
  ...p
}: Base & { options: readonly string[]; placeholder?: string }) {
  const id = useFieldId(p.name);
  return (
    <div className={`${styles.field} ${p.error ? styles.invalid : ""} ${p.className ?? ""}`}>
      <label htmlFor={id} className={styles.label}>
        {p.label}
        <RequiredMark required={p.required} />
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={p.name}
          aria-required={p.required}
          aria-invalid={p.error ? true : undefined}
          aria-describedby={describedBy(id, p.hint, p.error)}
          className={`${styles.input} ${styles.select}`}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <Meta name={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function TextareaField({ rows = 4, maxLength, ...p }: Base & { rows?: number; maxLength?: number }) {
  const id = useFieldId(p.name);
  return (
    <div className={`${styles.field} ${p.error ? styles.invalid : ""} ${p.className ?? ""}`}>
      <label htmlFor={id} className={styles.label}>
        {p.label}
        <RequiredMark required={p.required} />
      </label>
      <textarea
        id={id}
        name={p.name}
        rows={rows}
        maxLength={maxLength}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.hint, p.error)}
        className={`${styles.input} ${styles.textarea}`}
      />
      <Meta name={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function ChoiceGroup({
  type,
  options,
  onChange,
  defaultValue,
  ...p
}: Base & {
  type: "checkbox" | "radio";
  options: readonly string[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}) {
  const id = useFieldId(p.name);
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      className={`${styles.field} ${styles.fieldset} ${p.error ? styles.invalid : ""} ${p.className ?? ""}`}
      aria-describedby={describedBy(id, p.hint, p.error)}
      aria-invalid={p.error ? true : undefined}
    >
      <legend className={styles.label}>
        {p.label}
        <RequiredMark required={p.required} />
      </legend>
      <div className={styles.choices}>
        {options.map((o, i) => (
          <label key={o} className={styles.choice} htmlFor={`${id}-${i}`}>
            <input
              id={`${id}-${i}`}
              type={type}
              name={p.name}
              value={o}
              defaultChecked={defaultValue === o}
              className={`${styles.choiceInput} ${type === "radio" ? styles.radio : ""}`}
              onChange={onChange ? () => onChange(o) : undefined}
            />
            <span className={styles.choiceBox} aria-hidden="true" />
            <span className={styles.choiceText}>{o}</span>
          </label>
        ))}
      </div>
      <Meta name={id} hint={p.hint} error={p.error} />
    </fieldset>
  );
}

export function ConsentCheckbox({
  name,
  children,
  error,
  required = true,
}: {
  name: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}) {
  const id = useFieldId(name);
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label className={`${styles.choice} ${styles.consent}`} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={styles.choiceInput}
        />
        <span className={styles.choiceBox} aria-hidden="true" />
        <span className={styles.choiceText}>
          {children}
          {required && (
            <span className={styles.req} aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
      </label>
      <Meta name={id} error={error} />
    </div>
  );
}

/** Hidden anti-spam field. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div className={styles.hp} aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="company_url" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function ErrorSummary({
  errors,
  labels,
  summaryRef,
  idPrefix = "",
}: {
  errors: Record<string, string>;
  labels: Record<string, string>;
  summaryRef: RefObject<HTMLDivElement | null>;
  idPrefix?: string;
}) {
  const keys = Object.keys(errors);
  if (keys.length === 0) return null;
  return (
    <div ref={summaryRef} className={styles.summary} tabIndex={-1} aria-labelledby={`${idPrefix}error-summary-title`} role="group">
      <p id={`${idPrefix}error-summary-title`} className={styles.summaryTitle}>
        Please review {keys.length === 1 ? "1 field" : `${keys.length} fields`} before submitting.
      </p>
      <ul>
        {keys.map((k) => (
          <li key={k}>
            <a href={`#${idPrefix}${k}`}>
              {labels[k] ?? "Form"}: {errors[k]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
