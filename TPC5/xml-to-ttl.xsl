<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="article|book|inbook|inproceedings|misc|masterthesis|phdthesis|proceedings">
        ### http://www.semanticweb.org/comta/ontologies/tp5#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
                :<xsl:value-of select ="upper-case(name(.))"/>
            ; :title "<xsl:value-of select="title"/>"
        <xsl:if test="booktitle">
            ; :booktitle "<xsl:value-of select="booktitle"/>"
        </xsl:if>     
        <xsl:if test="address">
            ; :address "<xsl:value-of select="address"/>"
        </xsl:if>
        <xsl:if test="chapter">
            ; :chapter "<xsl:value-of select="chapter"/>"
        </xsl:if>
        <xsl:if test="doi">
            ; :doi "<xsl:value-of select="doi"/>"
        </xsl:if>
        <xsl:if test="howpublished">
            ; :howpublished "<xsl:value-of select="howpublished"/>"
        </xsl:if>
        <xsl:if test="isbn">
            ; :isbn "<xsl:value-of select="isbn"/>"
        </xsl:if>
        <xsl:if test="issn">
            ; :issn "<xsl:value-of select="issn"/>"
        </xsl:if>
        <xsl:if test="journal">
            ; :journal "<xsl:value-of select="journal"/>" 
        </xsl:if>
        <xsl:if test="month">
        <xsl:if test="publisher">
            ; :publisher "<xsl:value-of select="publisher"/>"
        </xsl:if>
        <xsl:if test="school">
            ; :school "<xsl:value-of select="school"/>"
        </xsl:if>
        <xsl:if test="uri">
            ; :uri "<xsl:value-of select="uri"/>"
        </xsl:if>
        <xsl:if test="volume">
            ; :volume "<xsl:value-of select="volume"/>"
        </xsl:if>
            ; :month "<xsl:value-of select="month"/>" 
        </xsl:if>
        <xsl:if test="nome">
            ; :nome "<xsl:value-of select="nome"/>" 
        </xsl:if>
        <xsl:if test="number">
            ; :number "<xsl:value-of select="number"/>"
        </xsl:if>
        <xsl:if test="pages">
            ; :pages "<xsl:value-of select="pages"/>"
        </xsl:if>
        <xsl:if test="deliverables">
            ; :pdf "<xsl:value-of select="deliverables/pdf/@url"/>"
        </xsl:if>
        <xsl:if test="year">
            ; :year "<xsl:value-of select="year"/>"
        </xsl:if> .
        
        <xsl:variable name="myId" select="@id"/>
        
        <xsl:for-each select="author">
            ###  http://www.semanticweb.org/comta/ontologies/tp5#<xsl:value-of select="@id"/>
            :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
                    :Autor ;
            :éAutor :<xsl:value-of select="$myId"/> ;
            :nome "<xsl:value-of select="."/>" .
        </xsl:for-each>
        
        <xsl:for-each select="editor">
            ###  http://www.semanticweb.org/comta/ontologies/tp5#<xsl:value-of select="@id"/>
            :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
                :Editor ;
            :editou :<xsl:value-of select="$myId"/>;
            :nome "<xsl:value-of select="."/>" .
        </xsl:for-each>
        
        <xsl:for-each select="author-ref">
            ###  http://www.semanticweb.org/comta/ontologies/tp5#<xsl:value-of select="@authorid"/>
            :<xsl:value-of select="@authorid"/> rdf:type owl:NamedIndividual ,
                :Autor ;
            :éAutorREF :<xsl:value-of select="$myId"/>  .
        </xsl:for-each>
        
        <xsl:for-each select="editor-ref">
            ###  http://www.semanticweb.org/comta/ontologies/tp5#<xsl:value-of select="@authorid"/>
            :<xsl:value-of select="@authorid"/> rdf:type owl:NamedIndividual ,
                :Editor ;
            :éEditorREF :<xsl:value-of select="$myId"/>  .
        </xsl:for-each>
    </xsl:template>
    
</xsl:stylesheet>