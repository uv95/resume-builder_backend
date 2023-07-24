const { GraphQLObjectType, GraphQLID } = require("graphql");
const Resume = require("../../../models/Resume");
const {Colors, Spacing, Layout, Heading, Subtitle, Header} = require("../../../models/settings");
const { 
  ColorsType, 
  DateType, 
  EducationSettingsType, 
  FontType,
  HeaderType,
  HeadingType,
  JobTitleType,
  LanguageSettingsType,
  LayoutType,
  NameType,
  ProfessionalExperienceSettingsType,
  ProfileSettingsType,
  SectionsOrderType,
  SkillsSettingsType,
  SpacingType,
  SubtitleType } = require("./");


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