import sys
from unittest.mock import MagicMock, patch

# Mock frontmatter and yaml modules since they are not available in the environment
mock_frontmatter = MagicMock()
mock_yaml = MagicMock()
mock_yaml.YAMLError = type('YAMLError', (Exception,), {})

sys.modules["frontmatter"] = mock_frontmatter
sys.modules["yaml"] = mock_yaml

# Now we can import analyze_seo without ModuleNotFoundError
import analyze_seo

def test_analyze_seo_exception_handling():
    # Test that the specific exceptions are caught
    root_dir = "."
    rel_path = "test.md"
    abs_path = "./test.md"

    # Mock iter_content_files to return one file
    with patch("analyze_seo.iter_content_files", return_value=[(rel_path, abs_path)]), \
         patch("analyze_seo.has_front_matter", return_value=True), \
         patch("builtins.print") as mock_print:

        # Test Case 1: yaml.YAMLError
        mock_frontmatter.load.side_effect = mock_yaml.YAMLError("YAML error")
        analyze_seo.analyze_seo(root_dir)
        mock_print.assert_any_call(f"Error processing {rel_path}: YAML error")

        # Test Case 2: ValueError
        mock_print.reset_mock()
        mock_frontmatter.load.side_effect = ValueError("Value error")
        analyze_seo.analyze_seo(root_dir)
        mock_print.assert_any_call(f"Error processing {rel_path}: Value error")

        # Test Case 3: OSError
        mock_print.reset_mock()
        mock_frontmatter.load.side_effect = OSError("OS error")
        analyze_seo.analyze_seo(root_dir)
        mock_print.assert_any_call(f"Error processing {rel_path}: OS error")

        # Test Case 4: Other Exception (should NOT be caught by the new specific catch, but we'll see it bubble up if we don't mock analyze_seo's try-except correctly)
        # However, our goal is to verify that the code we wrote handles these three.
        # If we want to verify it DOESN'T catch others, we'd expect it to raise.
        mock_print.reset_mock()
        mock_frontmatter.load.side_effect = RuntimeError("Other error")
        try:
            analyze_seo.analyze_seo(root_dir)
            assert False, "Should have raised RuntimeError"
        except RuntimeError:
            pass

    print("All verification tests passed!")

if __name__ == "__main__":
    test_analyze_seo_exception_handling()
