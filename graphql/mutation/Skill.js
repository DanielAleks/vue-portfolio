import gql from "graphql-tag";

// this is not being used anywhere because ManageRelationshipsImplementationGuidelineMutation has the relatedModel option: Task & Skill - 6/11 dan
const ManageRelationshipsSkillMutation = gql`
mutation ManageRelationshipsSkillMutation(
    $_id: String!
    action: String!
    relatedModel: String!
    # Use when related model is "ImplementationGuideline"
    _ids: [String]

) {
    ManageRelationshipsSkillMutation(
        _id: $_id
        action: $action
        relatedModel: $relatedModel
        _ids: $_ids
    ) {
        _id
        categoryID
        CategoryName
        description
        isActive
        name
        created_at
        updated_at
    }
}
`;

export { ManageRelationshipsSkillMutation };
