const TabMenu = ({ tab }) => {
  if (tab === 0) {
    return <div>Tab 1 내용입니다.</div>;
  } else if (tab.클릭된탭 === 1) {
    return <div>Tab 2 내용입니다.</div>;
  } else if (tab.클릭된탭 === 2) {
    return <div>Tab 3 내용입니다.</div>;
  }
};

export default TabMenu;
