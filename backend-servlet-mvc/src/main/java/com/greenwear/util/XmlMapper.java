package com.greenwear.util;

import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * XML Mapper 로더.
 * resources/mapper/*.xml 파일을 파싱해 queryId -> SQL 문자열 맵으로 캐싱한다.
 *
 * Mapper XML 형식:
 * <mapper namespace="user">
 *   <select id="selectById">  SELECT ...  </select>
 *   <insert id="insert">      INSERT ...  </insert>
 *   <update id="update">      UPDATE ...  </update>
 *   <delete id="delete">      DELETE ...  </delete>
 * </mapper>
 *
 * queryId 형식: "namespace.id"  예) "user.selectById"
 */
public class XmlMapper {

    // 싱글턴 캐시: queryId -> SQL
    private static final Map<String, String> sqlMap = new HashMap<>();

    static {
        loadMapper("mapper/UserMapper.xml");
        loadMapper("mapper/ProductMapper.xml");
        loadMapper("mapper/OrderMapper.xml");
    }

    private static void loadMapper(String resourcePath) {
        try (InputStream is = XmlMapper.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (is == null) {
                System.err.println("[XmlMapper] 파일 없음: " + resourcePath);
                return;
            }
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(is);
            doc.getDocumentElement().normalize();

            String namespace = doc.getDocumentElement().getAttribute("namespace");
            String[] tags = {"select", "insert", "update", "delete"};

            for (String tag : tags) {
                NodeList nodes = doc.getElementsByTagName(tag);
                for (int i = 0; i < nodes.getLength(); i++) {
                    Element el = (Element) nodes.item(i);
                    String id  = el.getAttribute("id");
                    String sql = el.getTextContent().trim();
                    String key = namespace + "." + id;
                    sqlMap.put(key, sql);
                }
            }
            System.out.println("[XmlMapper] 로드 완료: " + resourcePath + " (" + sqlMap.size() + "개 쿼리)");
        } catch (Exception e) {
            throw new RuntimeException("[XmlMapper] 로드 실패: " + resourcePath, e);
        }
    }

    /** queryId = "namespace.id" 형식으로 SQL 반환 */
    public static String getSql(String queryId) {
        String sql = sqlMap.get(queryId);
        if (sql == null) {
            throw new IllegalArgumentException("[XmlMapper] 쿼리 없음: " + queryId);
        }
        return sql;
    }
}
