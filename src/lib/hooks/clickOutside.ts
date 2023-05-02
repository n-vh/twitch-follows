export function clickOutside(node: HTMLElement) {
  const handleClick = ({ target }: { target: any }) => {
    if (!node.contains(target)) {
      node.dispatchEvent(new CustomEvent('out'));
    }
  };

  window.addEventListener('mousedown', handleClick);

  return {
    destroy() {
      window.removeEventListener('mousedown', handleClick);
    },
  };
}
