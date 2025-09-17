import{g as e}from"./index-BAc7fDxH.js";e`
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
