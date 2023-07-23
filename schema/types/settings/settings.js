const { GraphQLObjectType, GraphQLID } = require("graphql");
const Resume = require("../../../models/Resume");
const {Colors, Spacing, Layout} = require("../../../models/Settings");
const { ColorsType } = require("./colors");
const { DateType } = require("./date");
const { EducationSettingsType } = require("./education");
const { FontType } = require("./font");
const { HeaderType } = require("./header");
const { HeadingType } = require("./heading");
const { JobTitleType } = require("./jobTitle");
const { LanguageSettingsType } = require("./language");
const { LayoutType } = require("./layout");
const { NameType } = require("./name");
const { ProfessionalExperienceSettingsType } = require("./professionalExperience");
const { ProfileSettingsType } = require("./profile");
const { SectionsOrderType } = require("./sectionsOrder");
const { SkillsSettingsType } = require("./skills");
const { SpacingType } = require("./spacing");
const { SubtitleType } = require("./subtitle");

exports.SettingsType = new GraphQLObjectType({
    name: 'Settings',
    fields: () => ({
      id: { type: GraphQLID },
      sectionsOrder: { type: SectionsOrderType },
      layout: { 
        type: LayoutType,
        resolve(parent,args){
          return Layout.findOne({ resumeId: parent.resumeId })
        }
       },
      colors: { 
       type: ColorsType,
       resolve(parent,args){
        return Colors.findOne({ resumeId: parent.resumeId })
      }
      },
      spacing: { 
        type: SpacingType,
        resolve(parent,args){
          return Spacing.findOne({ resumeId: parent.resumeId })
        } 
      },
      font: { type: FontType },
      heading: { type: HeadingType },
      subtitle: { type: SubtitleType },
      header: { type: HeaderType },
      name: { type: NameType },
      jobTitle: { type: JobTitleType },
      date: { type: DateType },
      skills: { type: SkillsSettingsType },
      language: { type: LanguageSettingsType },
      profile: { type: ProfileSettingsType },
      education: { type: EducationSettingsType },
      professionalExperience: { type: ProfessionalExperienceSettingsType },
      resume: {
        type: require("../resume/resume").ResumeType,
        resolve(parent, args) {
          return Resume.findById(parent.resumeId);
        },
}
    }),
  });