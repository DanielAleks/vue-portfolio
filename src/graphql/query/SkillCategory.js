import gql from "graphql-tag";

const SkillCategoryQuery = gql`
  query SkillCategory($id: Int!) {
    SkillCategory(id: $id) {
      id
      name
    }
  }
`;

const SkillCategoriesQuery = gql`
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
`;

export { SkillCategoryQuery, SkillCategoriesQuery };
