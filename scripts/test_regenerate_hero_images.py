import sys
from unittest.mock import MagicMock, patch
from pathlib import Path

# Mock PIL before importing the script to avoid ModuleNotFoundError
mock_image_module = MagicMock()
# Mock Resampling as it's used as an enum/attribute
mock_image_module.Resampling.LANCZOS = 1
sys.modules["PIL"] = MagicMock()
sys.modules["PIL.Image"] = mock_image_module
sys.modules["PIL.ImageOps"] = MagicMock()

# Now we can safely import save_variant
from scripts.regenerate_hero_images import save_variant

def test_save_variant_smaller_width():
    mock_image = MagicMock()
    mock_image.size = (100, 100)
    destination = Path("fake/path/test_smaller.webp")
    target_width = 50

    with patch("pathlib.Path.mkdir"), \
         patch("pathlib.Path.relative_to", return_value=Path("test_smaller.webp")), \
         patch("builtins.print"):
        save_variant(mock_image, target_width, destination)

    # For width < src_width (50 < 100), resize should be called
    mock_image.resize.assert_called_once()
    args, _ = mock_image.resize.call_args
    # Target height should be 50 (proportional)
    assert args[0] == (50, 50)

    # Should save the resized image
    resized_image = mock_image.resize.return_value
    resized_image.save.assert_called_once()
    assert resized_image.save.call_args[0][0] == destination

def test_save_variant_equal_width():
    mock_image = MagicMock()
    mock_image.size = (100, 100)
    destination = Path("fake/path/test_equal.webp")
    target_width = 100

    with patch("pathlib.Path.mkdir"), \
         patch("pathlib.Path.relative_to", return_value=Path("test_equal.webp")), \
         patch("builtins.print"):
        save_variant(mock_image, target_width, destination)

    # For width == src_width (100 == 100), copy should be called, not resize
    mock_image.resize.assert_not_called()
    mock_image.copy.assert_called_once()

    # Should save the copied image
    copied_image = mock_image.copy.return_value
    copied_image.save.assert_called_once()
    assert copied_image.save.call_args[0][0] == destination

def test_save_variant_greater_width():
    mock_image = MagicMock()
    mock_image.size = (100, 100)
    destination = Path("fake/path/test_greater.webp")
    target_width = 150

    with patch("pathlib.Path.mkdir"), \
         patch("pathlib.Path.relative_to", return_value=Path("test_greater.webp")), \
         patch("builtins.print"):
        save_variant(mock_image, target_width, destination)

    # For width > src_width (150 > 100), copy should be called, not resize
    # This verifies the edge case that we don't upscale
    mock_image.resize.assert_not_called()
    mock_image.copy.assert_called_once()

    # Should save the copied image
    copied_image = mock_image.copy.return_value
    copied_image.save.assert_called_once()
    assert copied_image.save.call_args[0][0] == destination
