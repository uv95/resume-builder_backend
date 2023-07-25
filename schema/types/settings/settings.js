const { GraphQLObjectType, GraphQLID } = require("graphql");
const Resume = require("../../../models/Resume");
const { ColorsType } = require("./colors/colors");
const { DateType } = require("./date/date");
const { EducationSettingsType } = require("./education/education");
const { FontType } = require("./font/font");
const { HeaderType } = require("./header/header");
const { HeadingType } = require("./heading/heading");
const { JobTitleType } = require("./jobTitle/jobTitle");
const { LanguageSettingsType } = require("./language/language");
const { LayoutType } = require("./layout/layout");
const { NameType } = require("./name/name");
const { ProfessionalExperienceSettingsType } = require("./professionalExperience/professionalExperience");
const { ProfileSettingsType } = require("./profile/profile");
const { SkillsSettingsType } = require("./skills/skills");
const { SpacingType } = require("./spacing/spacing");
const { SubtitleType } = require("./subtitle/subtitle");
const { SectionsOrderType } = require("./sectionsOrder/sectionsOrder");
const Layout = require("../../../models/settings/Layout/Layout");
const Colors = require("../../../models/settings/Colors/Colors");
const Header = require("../../../models/settings/Header/Header");
const Heading = require("../../../models/settings/Heading/Heading");
const Spacing = require("../../../models/settings/Spacing/Spacing");
const Subtitle = require("../../../models/settings/Subtitle/Subtitle");

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
      heading: { 
        type: HeadingType,
        resolve(parent,args){
          return Heading.findOne({ resumeId: parent.resumeId })
        }  
      },
      subtitle: { 
        type: SubtitleType,
        resolve(parent,args){
          return Subtitle.findOne({ resumeId: parent.resumeId })
       } 
      },
      header: { 
        type: HeaderType,
        resolve(parent,args){
          return Header.findOne({ resumeId: parent.resumeId })
       } 
      },
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