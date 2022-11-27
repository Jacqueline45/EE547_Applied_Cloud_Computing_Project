import { useState } from "react";
const usePostBox = () => {
    const [postBoxes, setPostBoxes] = useState([]);
    const createPostBox = (me, friend) => {
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (postBoxes.some(({ key }) => key === newKey)) {throw new Error(friend +"'s post box has already opened.");}
        const newPostBoxes = [...postBoxes];
        newPostBoxes.push({ friend, key: newKey}); 
        setPostBoxes(newPostBoxes);
        return newKey;
    };

    const removePostBox = (targetKey, activeKey) => {
      let newActiveKey = activeKey;
      let lastIndex;
      postBoxes.forEach(({ key }, i) => {
        if (key === targetKey) { lastIndex = i - 1; }});
        const newPostBoxes = postBoxes.filter(
          (postBox) => postBox.key !== targetKey);
        if (newPostBoxes.length) {
          if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newPostBoxes[lastIndex].key;
            } else { newActiveKey = newPostBoxes[0].key; }
          }
        } else newActiveKey = ""; // No chatBox left
        setPostBoxes(newPostBoxes);
        return newActiveKey;
    };
  return { postBoxes, createPostBox, removePostBox };
};
export default usePostBox;