String s = "XiaoPeng=Employer.find('developer'){\n"+
        "  GitHub.page('mrcoder.github.com')\n"+
        "}\n"+
        "Employer.contact(XiaoPeng){\n"+
        "  // Preferred approach\n"+
        "  Telephone.call('+8613810415430')\n"+
        "  Email.send(to:'eagle.xiao@gmail.com'){\n"+
        "    XiaoPeng.getReply(with:Resume)\n"+
        "  }\n"+
        "}\n"+
        "\n"+
        "Employer.interview(XiaoPeng){\n"+
        "  Skype.call('eagle.xiao.cn'){\n"+
        "    XiaoPeng.queryDeliveryExperience(){\n"+
        "      queryJavaExperience()\n"+
        "      queryCSharpExperience()\n"+
        "      queryWebDevelopmentExperience()\n"+
        "    }\n"+
        "    XiaoPeng.queryAgileConsultancyExperience()\n"+
        "  }\n"+
        "}\n"+
        "\n"+
        "Employer.offer(XiaoPeng){\n"+
        "  Email.send(to:'eagle.xiao@gmail.com', with:OFFER)\n"+
        "}";