import{g as e}from"./index-Cv2yDX8n.js";e`
  query SkillCategory($id: Int!) {
    SkillCategory(id: $id) {
      id
      name
    }
  }
`;const a=e`
  query SkillCategories (
    $name: String
  ) {
    SkillCategories(
      name: $name
    ) {
      data {
        id
        name
      }
    }
  }
`;export{a as S};
