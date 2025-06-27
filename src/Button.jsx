export default function Button({children, className,data_bs_toggle,data_bs_target, ...props}) {
  return (
    <button
      className={className}
      data-bs-toggle={data_bs_toggle}
      data-bs-target={data_bs_target}
      aria-label={props.aria_label}
      type={props.type}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}
