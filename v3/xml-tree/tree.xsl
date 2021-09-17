<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output
	method="html"
	encoding="utf-8"
	omit-xml-declaration="yes"
	indent="no"
	doctype-system="about:legacy-compat"
/>

<xsl:variable name="modIcoSize" select="'spcIco24px'" />
<xsl:variable name="modSkin" select="'sknWindows'" />

<xsl:template match="*[@id = 'wgtBooks']/*">
	<xsl:apply-templates select="." mode="tree-list">
		<xsl:with-param name="wgtId" select="../@id" />
	</xsl:apply-templates>
</xsl:template>

<xsl:template match="ul" mode="tree-list">
	<xsl:param name="wgtId" />
	
	<xsl:variable name="listMods">
		<xsl:choose>
			<xsl:when test="$wgtId"><xsl:value-of select="$wgtId" /><xsl:text> </xsl:text>lstRoot</xsl:when>
			<xsl:otherwise>lstInner</xsl:otherwise>
		</xsl:choose><xsl:text> </xsl:text><xsl:value-of select="$modIcoSize" />
	</xsl:variable>
	
	<ul iam-tree-list="">
		<xsl:attribute name="iam-tree-list"><xsl:value-of select="$listMods" /></xsl:attribute>
		<xsl:apply-templates select="li" mode="tree-item" />
	</ul>
</xsl:template>

<xsl:template match="li" mode="tree-item">
	<xsl:variable name="sttNode">
		<xsl:choose>
			<xsl:when test="ul/li/ul">sttOpen</xsl:when>
			<xsl:when test="ul">sttClose</xsl:when>
			<xsl:otherwise>sttLeaf</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<li iam-tree-item=""><span iam-tree-label="{$modSkin} {$sttNode} {$modIcoSize}"><xsl:value-of select="text()" /></span>
		<xsl:apply-templates select="ul" mode="tree-list" />
	</li>
</xsl:template>

<xsl:template match="link[contains(@href, '.css') and not(@rel | @type)]">
	<xsl:copy>
		<xsl:apply-templates select="@*" />
		<xsl:attribute name="rel">stylesheet</xsl:attribute>
	</xsl:copy>
</xsl:template>

<xsl:template match="@* | node()">
	<xsl:copy>
		<xsl:apply-templates select="@* | node()" />
	</xsl:copy>
</xsl:template>


</xsl:stylesheet>