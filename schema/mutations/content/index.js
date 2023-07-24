const { educationMutations } = require("./education/education");
const { languageMutations } = require("./language/language");
const { personalDetailsMutations } = require("./personalDetails/personalDetails");
const { professionalExperienceMutations } = require("./professionalExperience/professionalExperience");
const { profileMutations } = require("./profile/profile");
const { projectMutations } = require("./project/project");
const { skillsMutations } = require("./skills/skills");

module.exports= {
    skillsMutations,
    educationMutations,
    personalDetailsMutations,
    projectMutations,
    professionalExperienceMutations,
    languageMutations,
    profileMutations
}