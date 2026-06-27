package com.greenwear.proc;

import com.greenwear.dao.UserDAO;
import com.greenwear.vo.UserVO;
import org.mindrot.jbcrypt.BCrypt;

import java.sql.SQLException;
import java.util.List;

/**
 * 회원 비즈니스 로직.
 * DAO 호출 전후의 검증, 암호화, 트랜잭션 조율을 담당한다.
 */
public class UserProc {

    private final UserDAO userDAO = new UserDAO();

    // ───────────────── 로그인 ─────────────────

    /**
     * 이메일 + 평문 비밀번호로 로그인 검증.
     * @return 성공 시 UserVO, 실패 시 null
     */
    public UserVO login(String email, String rawPassword) throws SQLException {
        if (email == null || rawPassword == null) return null;

        UserVO user = userDAO.selectByEmail(email.trim());
        if (user == null || !user.isActive()) return null;
        if (!BCrypt.checkpw(rawPassword, user.getPassword())) return null;

        user.setPassword(null); // 세션에 비밀번호 저장 금지
        return user;
    }

    // ───────────────── 회원가입 ─────────────────

    /**
     * 신규 회원 등록.
     * @return 생성된 user id, 중복이면 -1
     */
    public long register(String username, String email, String rawPassword,
                         String fullName, String phoneNumber) throws SQLException {
        if (username == null || email == null || rawPassword == null) {
            throw new IllegalArgumentException("필수 입력값 누락");
        }
        if (userDAO.countByEmail(email.trim()) > 0) return -1L;
        if (userDAO.countByUsername(username.trim()) > 0) return -2L;

        UserVO vo = new UserVO();
        vo.setUsername(username.trim());
        vo.setEmail(email.trim().toLowerCase());
        vo.setPassword(BCrypt.hashpw(rawPassword, BCrypt.gensalt()));
        vo.setFullName(fullName);
        vo.setPhoneNumber(phoneNumber);

        return userDAO.insert(vo);
    }

    // ───────────────── 조회 ─────────────────

    public UserVO getUserById(long id) throws SQLException {
        UserVO vo = userDAO.selectById(id);
        if (vo != null) vo.setPassword(null);
        return vo;
    }

    public List<UserVO> getAllUsers() throws SQLException {
        List<UserVO> list = userDAO.selectAll();
        list.forEach(u -> u.setPassword(null));
        return list;
    }

    // ───────────────── 수정 ─────────────────

    public int updateProfile(long id, String fullName, String phoneNumber) throws SQLException {
        UserVO vo = new UserVO();
        vo.setId(id);
        vo.setFullName(fullName);
        vo.setPhoneNumber(phoneNumber);
        return userDAO.update(vo);
    }

    public boolean changePassword(long id, String oldRaw, String newRaw) throws SQLException {
        UserVO user = userDAO.selectById(id);
        if (user == null) return false;
        if (!BCrypt.checkpw(oldRaw, user.getPassword())) return false;

        String hashed = BCrypt.hashpw(newRaw, BCrypt.gensalt());
        return userDAO.updatePassword(id, hashed) > 0;
    }
}
