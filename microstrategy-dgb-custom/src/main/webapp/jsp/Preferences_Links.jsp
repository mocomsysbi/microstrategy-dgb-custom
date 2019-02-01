<%
    /*
     * Preferences_Links.jsp
     * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
     */
%><%@ page errorPage="Error_Links.jsp"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ page import="com.microstrategy.web.app.beans.PageComponent"
%><%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");
%><jsp:include page='<%=mstrPage.getTemplateInfo().getDefaultTemplate().getSection("links")%>' flush="true" />

    <!-- Base Mojo CSS file -->
    <web:resource type="js-style" name="mojo/css/core.css"/>
    <!-- Mojo Custom Group Editor CSS file -->
    <web:resource type="js-style" name="mojo/css/cge.css"/>
    <!-- Mojo Widgets CSS common in non-mojo-based pages -->
    <web:resource type="js-style" name="mojo/css/page-common.css"/>
    
<web:resource type="style" name="mstr/pagePreferences.css"/>

<web:ifFeature name="dhtml"><web:then>
   <web:resource type="javascript" name="preferences.js"/>
</web:then></web:ifFeature>